const User = require('../models/user.models.js')

const getUserData = async (req,res)=>{
    const userId = req.user?.id;
    
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        res.json({
            success:true,
            userDetails:{
                name:user.name,
                email:user.email,
                isAccountVerified : user.isAccountVerified
            }
        })
    } catch (error) {
        res.json({success:false,error:error.message})
    }
}

module.exports = getUserData