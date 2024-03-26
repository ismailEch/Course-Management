// Require dotenv in app.js
require('dotenv').config();

const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const CustomError = require('../Utils/CustomError');
const sendEmail = require('../Utils/email');
const crypto = require('crypto');


//jwt function
const signToken  = id =>{
    return  jwt.sign({id} , process.env.SECRET_JWT, {
        expiresIn:'30d'
    });
}

//register Function 
exports.registerUser = async (req ,res,next)=>{
    try {
        const {FirstName,LastName,email,password,phone,profilePicture} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const err = new CustomError("Email already exists", 400);
            return next(err);
        }

        const newUser  =await User.create({FirstName,LastName,email,password,phone,profilePicture});
        const token = signToken(newUser._id);
        res.status(201).json({
            status:'Seccuss',
            token:token ,
            User:newUser
        });
    } catch (error) {
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
    
}

//login Function 
exports.login = async (req ,res,next)=>{
    try {
        const {email,password} = req.body;
        if (!email || !password) {
            const err = new CustomError ('Please provide both email and password' , 400) ;
            return next (err);
        }
        const user = await User.findOne({ email: email });
        if (!user || !(await user.comparePasswordInDb(password, user.password))) {
            const err = new CustomError ('Incorrect email or password' , 400) ;
            return next (err);
        }
    
        const token = signToken(user._id);
        res.status(201).json({
            status:'Seccuss',
            token,
            user
        });
    } catch (error) {
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//forgot password :
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found', message: 'No user with this email' });
        }

        const resetToken = user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get('host')}/api/authUser/resetPassword/${resetToken}`;
        const message = `We have received a password reset request. Please use the below link to reset your password:\n\n${resetUrl}\n\nThis reset link will be valid only for 10 minutes.`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Change Request Received',
                message: message
            });
            
            return res.status(200).json({
                message: 'Password reset link sent to the user email'
            });
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;
            await user.save({ validateBeforeSave: false });
            console.error(error);
            return res.status(500).json({ error: 'Email Sending Error', message: 'There was an error sending the password reset email. Please try again later.' });
            // next(err);
        }
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error', message: 'An error occurred while processing your request' });
    }
}

//Reset Password
exports.resetPassword = async(req,res,next)=>{
    const token= crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({passwordResetToken:token , passwordResetTokenExpires : {$gt:Date.now()}});
    if(!user){
        const error = new CustomError('token is invalid or has expired !' , 400);
        next(error)
    }
    
    user.password =req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    const loginToken = signToken(user._id);

    return res.status(200).json({
        status: 'success',
        token: loginToken
    });
}