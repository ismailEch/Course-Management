const express = require('express');
const reviewController = require('../Controllers/reviewController')
const authMiddleware = require('../Middlewares/authMiddleware')
const router = express.Router();

router.route('/' )
.get( reviewController.GetAllReviews)
.post(authMiddleware.protect , reviewController.CreateReview)

router.route('/:id' )
.get( reviewController.GetSingleReview)
.patch( reviewController.UpdateReview)
.delete( reviewController.deleteReview)






module.exports = router