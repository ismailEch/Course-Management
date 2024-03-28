const express = require('express');
const teacherController = require('../Controllers/userController')
const router = express.Router();



router.route('/' )
.get(teacherController.getAllUsers)

router.route('/:id' )
.get( teacherController.GetSingleUser)
.patch( teacherController.UpdateUser)
.delete( teacherController.deleteUser)





module.exports = router