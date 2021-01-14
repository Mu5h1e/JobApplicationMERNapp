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

router.post('/user/',profileDisplayController)

module.exports = router