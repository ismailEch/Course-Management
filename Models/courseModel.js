const mongoose = require('mongoose');
const validator = require('validator');


const courseSchema = new mongoose.Schema({

    title: {
    type: String,
    required: [true, 'Please Enter title']
    },

    description: {
    type: String,
    required: [true, 'Please Enter description']
    },

    language: {
    type: String,
    required: [true, 'Please Enter language']
    },

    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: [true, 'Please Enter Course level ']

    },

    price: {
    type: Number,
    required: [true, 'Please Enter price']
    },

    valid: {
        type: String,
        enum: ['valid', 'invalid', 'pending'],
        default :'pending'
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
