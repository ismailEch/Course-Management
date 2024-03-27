const express = require('express');
const wishListController = require('../Controllers/wishListController')
const authMiddleware = require('../Middlewares/authMiddleware')
const router = express.Router();

router.put('/addlike/:id',authMiddleware.protect, wishListController.addLike);
router.put('/removelike/:id',authMiddleware.protect, wishListController.removeLike);
router.get('/liked',authMiddleware.protect, wishListController.getCoursesLikedByUser);






module.exports = router