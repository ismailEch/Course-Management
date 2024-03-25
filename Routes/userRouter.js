const express = require('express');
const userController = require('../Controllers/userController')
const router = express.Router();



router.route('/' )
.get(userController.getAllUsers)

router.route('/:id' )
.get( userController.GetSingleUser)
.patch( userController.UpdateUser)
.delete( userController.deleteUser)





module.exports = router