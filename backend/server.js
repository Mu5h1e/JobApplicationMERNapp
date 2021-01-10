const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()


// Config .env to ./config/config.env
require('dotenv').config({
path:'./config/config.env'
})

// Config for only development
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))

}

// Loading all routes
const authRouter = require('./routes/auth.route')

//Use Routes
app.use('/api', authRouter)

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