const mongoose = require('mongoose');
const validator = require('validator');




const subscriptionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    status: {
        type: String,
        enum: ['active', 'canceled']
    }
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
