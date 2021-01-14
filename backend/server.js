const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')

require('dotenv').config({
path:'./config/config.env'
})

const app = express()

connectDB()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))

}

const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')

app.use('/api', authRouter)
app.use('/api', userRouter)

app.use((req,res,next) => {
    res.status(404).json({
        success: false,
        message: 'Page not found',
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})