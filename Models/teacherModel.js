const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');



const teacherSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    FirstName: {
    type: String,
    required: [true, 'Please Enter Your First Name']
    },

    LastName: {
    type: String,
    required: [true, 'Please Enter Your Last Name']
    },

    email: {
    type: String,
    required: [true, 'Please Enter Your Email']
    },

    password: {
    type: String,
    required: [true, 'Please Enter password']
    },

    phone: {
    type: Number,
    required: [true, 'Please Enter Your phone Number']
    },

    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],

    profilePicture: {
    type: String,
    required: [true, 'Please Enter Your Photo']
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
});


const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
