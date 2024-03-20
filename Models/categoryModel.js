const mongoose = require('mongoose');
const validator = require('validator');


const CategorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;