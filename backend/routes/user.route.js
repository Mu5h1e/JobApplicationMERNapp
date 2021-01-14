const express = require('express')
const router = express.Router()

const {
    authorisationLoginController
} = require('../controllers/auth.controller')

const {
    profileDisplayController
} = require('../controllers/user.controller')

const {

} = require('../helpers/user.helper')

router.get('/user/:id',profileDisplayController)

module.exports = router