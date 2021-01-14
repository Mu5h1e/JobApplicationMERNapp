const express = require('express')
const router = express.Router()

const {
    registerController,
    activationController,
    loginController,
    forgotPasswordController
} = require('../controllers/auth.controller.js')

const {
    validSign,
    forgotPasswordValidator,
    resetPasswordValidator,
    validLogin
} = require('../helpers/validation.helper')

router.post('/activation', activationController)
router.post('/login', validLogin, loginController)
router.post('/register', validSign, registerController)
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
module.exports = router