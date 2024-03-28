const express = require('express');
const authTeacherController = require('../Controllers/authTeacherController')
const router = express.Router();

//Register
router.route('/signup' ).post( authTeacherController.registerTeacher)
//login
router.route('/login' ).post( authTeacherController.login)
router.route('/forgotPassword')
.post(authTeacherController.forgotPassword);
//rest pass:
router.route('/resetPassword/:token').patch(authTeacherController.resetPassword);



module.exports = router