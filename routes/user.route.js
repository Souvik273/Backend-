const express = require('express')
const getUserData = require('../controller/user.controller')
const userAuth = require('../middleware/user.auth')

const userRouter = express.Router()

userRouter.get('/user',userAuth,getUserData)

module.exports = userRouter