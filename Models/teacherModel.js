const mongoose = require('mongoose');
const validator = require('validator');//---------------------------
const bcrypt = require('bcrypt');
const crypto = require('crypto');


const teacherSchema = new mongoose.Schema({

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
    },
    passwordResetToken :String,
    passwordResetTokenExpires:Date,
});

 //hashing password
 teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

//compaer || check password
teacherSchema.methods.comparePasswordInDb = async function(pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB);
};
//random token to rest password
userSchema.methods.createResetPasswordToken =  function (){
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() +10*60*1000;
    
    console.log(resetToken,this.passwordResetToken);
    return resetToken
}

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
