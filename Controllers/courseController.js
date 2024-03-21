const Course = require('../Models/courseModel');
const Category = require ('../Models/categoryModel');
const Teacher = require ('../Models/teacherModel');

exports.CreateCourse = async (req ,res ,next)=>{
    try {
        const { title, description ,language , level , price , cover , valid  , lectures , CategoryID ,  instructorID } = req.body;
         // Check if CategoryID and instructorID exist in the database
        const CategoryExists = await Category.findById(CategoryID);
        const TeacherExists = await Teacher.findById(instructorID);
        
        if (!CategoryExists || !TeacherExists) {
            return res.status(404).json({ error: 'Category or Teacher not found' });
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
            return res.status(400).json({ error: error.message });
        } else {
            // Handle other errors
            res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
}

//get Single course :
exports.GetSingleCourse = async (req,res,next) =>{
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({
            status:'success' ,
            Course : course
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//Update Course ;
exports.UpdateCourse = async (req,res,next)=>{
    try {
        const { title, description ,language , level , price , cover , valid  , lectures , CategoryID} = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { title, description ,language , level , price , cover , valid  , lectures , Category:CategoryID }, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({
            status :'update success' ,
            Update :updatedCourse
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//Delete Course function
exports.deleteCourse = async (req,res,next)=>{
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(500).json({ error: error.message });
    }
}
