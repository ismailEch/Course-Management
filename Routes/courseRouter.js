const express = require('express');
const courseController = require('../Controllers/courseController')
const router = express.Router();

router.route('/' )
.get( courseController.GetAllCourses)
.post( courseController.CreateCourse)

router.route('/:id' )
.get( courseController.GetSingleCourse)
.patch( courseController.UpdateCourse)
.delete( courseController.deleteCourse)


module.exports = router