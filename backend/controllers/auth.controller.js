const User = require('../models/auth.model')
const expressJwt = require('express-jwt')
// const _ = require('loadash')
const {OAuth2Client} = require('google-auth-library')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
// get useful errors from databases
const {errorHandler} = require('../helpers/dbErrorHandling')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MAIL_KEY)

exports.registerController = (req,res) => {
    const {name,email,password} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err,user) => {
            if (user) {
                return res.status(400).json({
                    error: "Email is taken"
                })
            }
        })

        const token = jwt.sign(
            {
                name,
                email,
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '15m'
            }
        )

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link',
            html: `
                <h1>Please Click link to activate</h1>
                <a href='${process.env.CLIENT_URL}/users/activate/${token}'><p>${process.env.CLIENT_URL}/users/activate/${token}</p></a>
                <hr/>
            `
        }

        sgMail.send(emailData).then(sent => {
            return res.json({
                message: `email has been sent to ${email}`
            })
        }).catch(err => {
            return res.status(400).json({
                error: errorHandler(err)
            })
        })
    }
}

exports.activationController = (req, res) => {
    const {token} = req.body
    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
          if (err) {
            console.log('Activation error');
            return res.status(401).json({
              errors: 'Expired link. Signup again'
            });
          } else {
            const { name, email, password } = jwt.decode(token);
    
            console.log(email);
            const user = new User({
              name,
              email,
              password
            });
    
            user.save((err, user) => {
              if (err) {
                console.log('Save error', errorHandler(err));
                return res.status(401).json({
                  errors: errorHandler(err)
                });
              } else {
                return res.json({
                  success: true,
                  message: user,
                  message: 'Signup success'
                });
              }
            });
          }
        });
      } else {
        return res.json({
          message: 'error happening please try again'
        });
      }
    };