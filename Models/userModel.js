const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');



const userSchema = new mongoose.Schema({
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
    reviewsGiven: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },

    profilePicture: {
      type: String,
      required: [true, 'Please Enter Your Photo']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  //hashing password
  userSchema.pre('save', async function (next) {
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
userSchema.methods.comparePasswordInDb = async function(pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};


const User = mongoose.model('User', userSchema);

module.exports = User;
