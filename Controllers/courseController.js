const Course = require('../Models/courseModel');
const Category = require ('../Models/categoryModel');
const Teacher = require ('../Models/teacherModel');
const CustomError = require('../Utils/CustomError');

exports.CreateCourse = async (req ,res ,next)=>{
    try {
        const { title, description ,language , level , price , cover , valid  , lectures , CategoryID ,  instructorID } = req.body;
         // Check if CategoryID and instructorID exist in the database
        const CategoryExists = await Category.findById(CategoryID);
        const TeacherExists = await Teacher.findById(instructorID);
        
        if (!CategoryExists || !TeacherExists) {
            const err = new CustomError ('Category or Teacher not found' , 404) ;
            return next (err);
            // return res.status(404).json({ error: 'Category or Teacher not found hh' });
        }
        const newCourse = await Course.create({ 
            title, 
            description, 
            language, 
            level , 
            price , 
            cover ,
            valid , 
            lectures , 
            Category: CategoryID,
            instructor: instructorID 
        });
        res.status(201).json({
            status:'success' ,
            Course : newCourse
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle Mongoose errors
            const err = new CustomError (error.message , 400) ;
            return next (err);
            // return res.status(400).json({ error: error.message });
        }else if(error.name === 'ValidationError'){
            const err = new CustomError ('Category or Teacher not found' , 404) ;
            return next (err);
        } else {
            const err = new CustomError (error.message , 500) ;
            return next (err);
        }
    }
}

//get all courses
exports.GetAllCourses = async (req ,res ,next)=>{
    try {
        const Courses = await Course.find();
        const CoursesCount = await Course.countDocuments();
        if(CoursesCount === 0){
            return res.status(200).json({
                status:'success',
                Reviews:'there are no Courses yet'
            })
        }
        res.status(200).json({
            status:'success' ,
            TotalCourses: CoursesCount,
            Courses : Courses
        })
    } catch (error) {
        const err = new CustomError(error.message, 500);
        return next(err);
    }
}

//get Single course :
exports.GetSingleCourse = async (req,res,next) =>{
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            const err = new CustomError ('Course not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'success' ,
            Course : course
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Course not found' , 404) ;
            return next (err);
            // return res.status(404).json({ error: 'Course not found' });
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
        // res.status(500).json({ error: error.message });
    }
}

//Update Course ;
exports.UpdateCourse = async (req,res,next)=>{
    try {
        const { title, description ,language , level , price , cover , valid  , lectures , CategoryID} = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { title, description ,language , level , price , cover , valid  , lectures , Category:CategoryID }, { new: true });
        if (!updatedCourse) {
            const err = new CustomError ('Course not found' , 404) ;
            return next (err);
            // return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({
            status :'update success' ,
            Update :updatedCourse
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Course not found' , 404) ;
            return next (err);
        }
            const err = new CustomError (error.message, 500) ;
            return next (err);
    }
}

//Delete Course function
exports.deleteCourse = async (req,res,next)=>{
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            const err = new CustomError ('Course not found' , 404) ;
            return next (err);
        }
        res.status(200).json({ message: 'Course deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Course not found' , 404) ;
            return next (err);
        }
            const err = new CustomError (error.message, 500) ;
            return next (err);
        // res.status(500).json({ error: error.message });
    }
}
//add comment
exports.addComment = async (req, res, next) => {
    const { comment } = req.body;
    let UserId = req.user._id
    console.log(UserId)
    try {
        const courseComment = await Course.findByIdAndUpdate(req.params.id, {
            $push: { comments: { text:comment, postedBy:UserId } }
        },
            { new: true }
        );
        res.status(200).json({
            success: true,
            courseComment
        })

    } catch (error) {
        const err = new CustomError (error.message, 500) ;
        return next (err);
    }

}


