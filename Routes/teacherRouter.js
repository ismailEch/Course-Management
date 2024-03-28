const express = require('express');
const teacherController = require('../Controllers/teacherController')
const router = express.Router();

router.route('/' )
.get(teacherController.getAllTeachers)

router.route('/:id' )
.get( teacherController.GetSingleTeacher)
.patch( teacherController.UpdateTeacher)
.delete( teacherController.deleteTeacher)



module.exports = router