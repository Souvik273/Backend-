const express = require('express')
const {register,logIn,logOut , sendVerifyOtp , verifyEmail,isUserAuthenticated, sendResetOtp, resetPassword} = require('../controller/auth.controller.js')
const userAuth = require('../middleware/user.auth.js')

const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.post('/login',logIn)
authRouter.post('/logout',logOut)
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp)
authRouter.post('/verify-email',userAuth,verifyEmail)
authRouter.post('/is-auth',userAuth,isUserAuthenticated)
authRouter.post('/send-reset-otp',sendResetOtp)
authRouter.post('/reset-password',resetPassword)

module.exports=authRouter