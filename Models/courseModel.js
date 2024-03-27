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
    likes: [{ type: mongoose.Schema.Types.ObjectId , ref: "User" }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
    cover: {
        type: String,
        required: [true, 'Please Enter Cover Course']
        },

    valid: {
        type: String,
        enum: ['valid', 'invalid', 'pending'],
        default :'pending'
    },
    lectures: {
        type: [{
            lecture_id: Number,
            title: {
                type: String,
                required: [true, 'Lecture title is required']
            },
            duration: {
                type: String,
                required: [true, 'Lecture duration is required']
            },
            content: {
                type: String,
                required: [true, 'Lecture content is required']
            },
            resources: [{
                name: { type: String },
                url: {
                    type: String,
                    required: [true, 'Lecture resources URL is required']
                }
            }]
        }],
        required: [true, 'At least one lecture is required']
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
