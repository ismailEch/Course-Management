const mongoose = require('mongoose');
const validator = require('validator');


const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Plan Name']
    },
    price: {
        type: Number,
        required: [true, 'Please Enter Plan Price ']
    },
    description: {
        type: String,
        required: [true, 'Please Enter Plan Description']
    },
    features: {
        type: [String] ,
        required: [true, 'Please Enter Plan features']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;