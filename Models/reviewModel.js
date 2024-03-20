const mongoose = require('mongoose');
const validator = require('validator');




const reviewSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    rating: {
        type: Number,
        required: [true, 'Please Enter Rating']
    },
    comment: {
        type: String,
        required: [true, 'Please Enter Comment']
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
