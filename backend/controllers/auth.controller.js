const User = require('../models/auth.model')
const expressJwt = require('express-jwt')

exports.registerController = (req,res) => {
    const {email,password} = req.body
    console.log(email, password)
    res.send('recieved: Success')
}