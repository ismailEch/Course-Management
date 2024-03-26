require('dotenv').config();
const Teacher = require('../Models/teacherModel');
const User = require('../Models/teacherModel');
const CustomError = require('../Utils/CustomError');
const bcrypt = require('bcrypt')


//get all Teachers
exports.getAllTeachers = async (req,res,next)=>{
    try {
        const teachers = await Teacher.find();
        const TeachersCount = await Teacher.countDocuments();
        if(TeachersCount === 0){
            return res.status(200).json({
                status:'success',
                Reviews:'there are no Teachers yet'
            })
        }
        res.status(200).json({
            status:'success' ,
            TotalUsers: TeachersCount,
            Users : teachers
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
        return next(err);
    }
}

//get Single Teacher By Id
exports.GetSingleTeacher = async (req,res,next) =>{
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            const err = new CustomError ('teacher not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'success' ,
            Teacher : teacher
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Teacher not found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//Update Single Teacher ;
exports.UpdateTeacher = async (req,res,next)=>{
    try {
        const { FirstName, LastName ,email  , phone , profilePicture} = req.body;
        let { password} = req.body;
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
                password = hashedPassword;
        }

        const UpdateTeacher = await Teacher.findByIdAndUpdate(req.params.id, { FirstName, LastName ,email , password , phone , profilePicture }, { new: true });
        if (!UpdateTeacher) {
            const err = new CustomError ('Teacher not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status :'update success' ,
            Update :UpdateTeacher
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Teacher not found' , 404) ;
            return next (err);
        }
            const err = new CustomError (error.message, 500) ;
            return next (err);
    }
}

//delet User
exports.deleteTeacher = async (req,res,next)=>{
    try {
        const teacher = await User.findByIdAndDelete(req.params.id);
        if (!teacher) {
            const err = new CustomError ('Teacher not found' , 404) ;
            return next (err);
        }
        res.status(200).json({ message: 'Teacher deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('teacher not found' , 404) ;
            return next (err);
        }
            const err = new CustomError (error.message, 500) ;
            return next (err);
    }
}
