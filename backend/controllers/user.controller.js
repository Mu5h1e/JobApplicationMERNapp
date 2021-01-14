const User = require('../models/auth.model')
const {validationResult} = require('express-validator')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const errorHandler = require('../helpers/dbErrorHandling')

exports.authorisationLoginController = ()  => expressJwt({
    secret: process.env.JWT_SECRET,
      algorithms: ['HS256']
  });
  

exports.profileDisplayController = (req, res) => {
    const userId = req.body;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
}