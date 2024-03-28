require('dotenv').config();

const jwt = require('jsonwebtoken');
const CustomError = require('../Utils/CustomError');
const sendEmail = require('../Utils/email');
const crypto = require('crypto');
const Teacher = require('../Models/teacherModel');


//jwt function
const signToken  = id =>{
    return  jwt.sign({id} , process.env.SECRET_JWT, {
        expiresIn:'30d'
    });
}

//register Function 
exports.registerTeacher = async (req ,res,next)=>{
    try {
        const {FirstName,LastName,email,password,phone,profilePicture} = req.body;
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            const err = new CustomError("Email already exists", 400);
            return next(err);
        }

        const newTeacher  =await Teacher.create({FirstName,LastName,email,password,phone,profilePicture});
        const token = signToken(newTeacher._id);
        res.status(201).json({
            status:'Seccuss',
            token:token,
            teacher:newTeacher
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
        const teacher = await Teacher.findOne({ email: email });
        if (!teacher || !(await teacher.comparePasswordInDb(password, teacher.password))) {
            const err = new CustomError ('Incorrect email or password' , 400) ;
            return next (err);
        }
    
        const token = signToken(teacher._id);
        res.status(201).json({
            status:'Seccuss',
            token,
            teacher
        });
    } catch (error) {
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//forgot password :
exports.forgotPassword = async (req, res, next) => {
    try {
        const teacher = await Teacher.findOne({ email: req.body.email });
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found', message: 'No Teacher with this email' });
        }

        const resetToken = teacher.createResetPasswordToken();
        await teacher.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get('host')}/api/authTeacher/resetPassword/${resetToken}`;
        const message = `We have received a password reset request. Please use the below link to reset your password:\n\n${resetUrl}\n\nThis reset link will be valid only for 10 minutes.`;

        try {
            await sendEmail({
                email: teacher.email,
                subject: 'Password Change Request Received',
                message: message
            });
            
            return res.status(200).json({
                message: 'Password reset link sent to the teacher email'
            });
        } catch (error) {
            teacher.passwordResetToken = undefined;
            teacher.passwordResetTokenExpires = undefined;
            await teacher.save({ validateBeforeSave: false });
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
    const teacher = await Teacher.findOne({passwordResetToken:token , passwordResetTokenExpires : {$gt:Date.now()}});
    if(!user){
        const error = new CustomError('token is invalid or has expired !' , 400);
        next(error)
    }
    
    teacher.password =req.body.password;
    teacher.passwordResetToken = undefined;
    teacher.passwordResetTokenExpires = undefined;

    await teacher.save();

    const loginToken = signToken(teacher._id);

    return res.status(200).json({
        status: 'success',
        token: loginToken
    });
}