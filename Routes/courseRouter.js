const express = require('express');
const courseController = require('../Controllers/courseController')
const authMiddleware = require('../Middlewares/authMiddleware')
const router = express.Router();

router.route('/' )
.get(authMiddleware.protect , courseController.GetAllCourses)
.post( courseController.CreateCourse)

router.route('/:id' )
.get( courseController.GetSingleCourse)
.patch( courseController.UpdateCourse)
.delete(authMiddleware.protect , authMiddleware.restrict('admin') , courseController.deleteCourse)
router.put('/comment/:id',authMiddleware.protect, courseController.addComment);
router.put('/addlike/:id',authMiddleware.protect, courseController.addLike);
router.put('/removelike/:id',authMiddleware.protect, courseController.removeLike);

module.exports = router