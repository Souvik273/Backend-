const express = require('express')
const {register,logIn,logOut} = require('../controller/user.controller')

const authRouter = express.Router()

authRouter.post('/register',register)
authRouter.post('/login',logIn)
authRouter.post('/logout',logOut)

module.exports=authRouter