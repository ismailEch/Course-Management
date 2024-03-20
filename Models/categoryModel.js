const mongoose = require('mongoose');
const validator = require('validator');


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Category Name']
    },
    description: {
        type: String,
        required: [true, 'Please Enter Category Description']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;