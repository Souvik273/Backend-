require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')

const PORT = process.env.PORT || 8080
const app = express()
connectDB()

// middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*',
    credentials:true
}))
app.use(cookieParser())

// API endPoints
app.use('/api/auth',authRouter)
app.use('/api/userDetails',userRouter)

// start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


