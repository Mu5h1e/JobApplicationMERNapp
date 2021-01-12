const express = require('express')
const router = express.Router()

const {
    registerController,
    activationController
} = require('../controllers/auth.controller.js')

const {
    validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/validation.helper')

router.post('/activation', activationController)
router.post('/register', registerController) 
module.exports = router