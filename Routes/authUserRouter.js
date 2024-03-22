const express = require('express');
const authController = require('../Controllers/authUserController')
const router = express.Router();




router.route('/singup' )
// .get( authUserController.GetAllCourses)login
.post( authController.registerUser)

router.route('/login' )
// .get( authUserController.GetAllCourses)login
.post( authController.login)

// router.route('/:id' )
// .get( authUserController.GetSingleCourse)
// .patch( authUserController.UpdateCourse)
// .delete( authUserController.deleteCourse)



module.exports = router