const mongoose = require('mongoose');
const validator = require('validator');




const userPaymentSchema = new mongoose.Schema({

    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    payment_amount: {
        type: Number,
        required: [true, 'Please Enter payment amount']
    },
    payment_method: {
        type: String,
        required: [true, 'Please Enter payment method ']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed']
    },
    transactionID: String ,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const TeacherPaymentSchema = mongoose.model('TeacherPaymentSchema', teacherPaymentSchema);

module.exports = TeacherPaymentSchema;
