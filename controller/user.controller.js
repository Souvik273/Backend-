const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../models/user.models.js');
const transporter = require('../config/nodemailer')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields...!" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use..." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate a token
    const token = createToken(newUser._id);

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send the welcome email
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,  
        subject: 'Test Email',
        text: 'This is a test email.',
    };
    

    try {
        if (!mailOptions.to || typeof mailOptions.to !== 'string') {
            console.error('Invalid recipient:', mailOptions.to);
        }
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    } catch (err) {
        console.error('Error sending email: ', err);
    }
        
    return res.status(201).json({ success: true, message: 'User registered successfully and email sent!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing fields...!" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email is not valid" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = createToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const logOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// send verification otp to user email 
const sendVerifyOtp = async (req,res)=>{
    try{
        const {userId} = req.body

        const user = await User.findById(userId)

        if(!user){
            return res.json({success:false,message:'User not found!!!'})
        }

        if(user.isAccountVerified){
            return res.json({success:false,message:'Account already verified'})
        }
        const otp = String (Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp
        user.verifyOtpExpiryAt = Date.now()+24*60*60*1000
        await user.save()

        const mailOption ={
            from:process.env.SENDER.EMAIL,
            to: user,
            subject: 'Account verification OTP',
            text: `Your verification OTP is ${otp} `,
        }
        try{
            await transporter.sendMail(mailOption)
        }catch(err){
            console.error(err)
        }
        res.json({success:true,message:'Verification OTP send'})
    }
    catch(error){
        res.json({success:false,message:error})
    }
}

const verifyEmail = async (req,res)=>{
    try{
        const {userId , otp } = req.body
        if(!userId || !otp){
            return res.json({success:false,message:'Invalid request'})
        }
        try{
            const user = await User.findById(userId)
            if(!user){
                return res.json({success:false,message:'User not found!!!'})
            }
            if(user.verifyOtp === '' || user.verifyOtp!==otp){
                return res.json({success:false,message:'Invalid OTP'})
            }
            if(user.verifyOtpExpireAt < Date.now()){
                return res.json({success:false,message:'OTP expired'})
            }
            user.isAccountVerified = true
            user.verifyOtp = ''
            user.verifyOtpExpireAt = 0
            await user.save()
            res.json({success:true,message:'Email verified successfully'})
        }catch(err){
            return res.json(err)
        }
    }catch(err){
        console.error(err)
    }
}

module.exports = { register, logIn, logOut , sendVerifyOtp ,verifyEmail};
