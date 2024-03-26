const express = require('express');
const authController = require('../Controllers/authUserController')
const router = express.Router();



//Register
router.route('/singup' ).post( authController.registerUser)
//login
router.route('/login' ).post( authController.login)
router.route('/forgotPassword')
.post(authController.forgotPassword);
//rest pass:
router.route('/resetPassword/:token').patch(authController.resetPassword);





module.exports = router