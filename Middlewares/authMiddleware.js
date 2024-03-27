require('dotenv').config();
const CustomError = require('../Utils/CustomError');
const jwt = require('jsonwebtoken')
const util  = require('util');
const User = require('../Models/userModel');


exports.protect = async (req, res, next) => {
    // Read the token from the request headers
    const testToken = req.headers.authorization
    let token;
    if(testToken && testToken.startsWith('Bearer')){
        token = testToken.split(' ')[1];
    }
    if(!token){
        next(new CustomError('you are not log in' , 401))
    }

    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_JWT);

    // Check if user exists
    const user = await User.findById(decodedToken.id);

    if(!user){
        const error = new CustomError('the user with given token dosn not not exist ',  401);
        next(error)
    }
    req.user = user;

    next();
};

//permossion 
exports.restrict = (role) =>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            const error = new CustomError('You Do Not Have the permission' , 403)
            next(error)
        }
        next()
    }
}
