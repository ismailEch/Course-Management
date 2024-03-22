// Require dotenv in app.js
require('dotenv').config();

const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const CustomError = require('../Utils/CustomError');


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