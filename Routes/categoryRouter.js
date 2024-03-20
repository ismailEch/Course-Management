const express = require('express');
const categoryController = require('../Controllers/categoryController')
const router = express.Router();

router.route('/' )
.get( categoryController.GetCategories)
.post( categoryController.CreateCategory)

router.route('/:id' )
.get( categoryController.GetSingleCategory)
.patch( categoryController.UpdateCategory)
.delete( categoryController.deleteCategory)



module.exports = router