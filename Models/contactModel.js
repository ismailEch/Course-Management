const mongoose = require('mongoose');
const validator = require('validator');


const contactSchema = new mongoose.Schema({

    name: {
    type: String,
    required: [true, 'Please Enter name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter email']
    },
    message: {
        type: String,
        required: [true, 'Please Enter message']
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
});


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
