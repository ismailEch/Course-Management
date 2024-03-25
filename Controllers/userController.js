// Require dotenv in app.js
require('dotenv').config();
const User = require('../Models/userModel');
const CustomError = require('../Utils/CustomError');
const bcrypt = require('bcrypt')


//get all Users
exports.getAllUsers = async (req,res,next)=>{
    try {
        const users = await User.find();
        const UsersCount = await User.countDocuments();
        if(UsersCount === 0){
            return res.status(200).json({
                status:'success',
                Reviews:'there are no Users yet'
            })
        }
        res.status(200).json({
            status:'success' ,
            TotalUsers: UsersCount,
            Users : users
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
        return next(err);
    }
}

//get Single User By Id
exports.GetSingleUser = async (req,res,next) =>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const err = new CustomError ('user not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'success' ,
            User : user
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('User not found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//Update Single User ;
exports.UpdateUser = async (req,res,next)=>{
    try {
        const { FirstName, LastName ,email  , phone , profilePicture} = req.body;
        let { password} = req.body;
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
                password = hashedPassword;
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, { FirstName, LastName ,email , password , phone , profilePicture }, { new: true });
        if (!updateUser) {
            const err = new CustomError ('User not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status :'update success' ,
            Update :updateUser
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('User not found' , 404) ;
            return next (err);
        }
            const err = new CustomError (error.message, 500) ;
            return next (err);
    }
}

//delet User
exports.deleteUser = async (req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            const err = new CustomError ('User not found' , 404) ;
            return next (err);
        }
        res.status(200).json({ message: 'User deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('user not found' , 404) ;
            return next (err);
        }
            const err = new CustomError (error.message, 500) ;
            return next (err);
    }
}
