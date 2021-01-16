const User = require('../models/auth.model')
const Job = require('../models/job.model')
const {validationResult} = require('express-validator')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const errorHandler = require('../helpers/dbErrorHandling')


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

exports.currentJobListings = (req, res) => {
    Job.find({expired:false}).exec((err, records) => {
        res.json(records)
    })
}

exports.addJobListing = (req, res) => {
    const {title, email, maxApplications, maxOpenings, description, skills} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        }) 
    }else {
        Job.findOne({
            title,
            email
        }).exec((err, job) => {
            if(job) {
                return res.status(400).json({
                    error: 'A job that you have posted with the same title exists'
                })
            }
        })
    }

    const job = new Job({
        title,
        email,
        maxApplications,
        maxOpenings,
        description,
        skills
    })

    job.save((err, job) => {
        if(err) {
            console.log('save error', errorHandler(err))
            return res.status(401).json({
                errors: errorHandler(err)
            })
        } else {
            return res.json({
                success: true,
                message: 'Job added successfuly'
            })
        }
    })
}
