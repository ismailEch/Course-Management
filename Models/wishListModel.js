const mongoose = require('mongoose');
const validator = require('validator');


const wishlistSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WishList = mongoose.model('WishList', wishlistSchema);

module.exports = WishList;