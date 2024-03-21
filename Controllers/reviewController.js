const Review = require('../Models/reviewModel');
const User = require ('../Models/userModel');
const Course = require ('../Models/courseModel')

exports.CreateReview = async(req,res,next)=>{
    try {
        const {userID,courseID,rating,comment} = req.body
        // Check if userId and courseId exist in the database
        // const userExists = await User.findById(userID);
        // const courseExists = await Course.findById(courseID);
        
        // if (!userExists || !courseExists) {
        //     return res.status(404).json({ error: 'User or Course not found' });
        // }
        
        const newReview = await Review.create({ userID, courseID, rating, comment });
        res.status(201).json({
            status:'success' ,
            Review : newReview
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


//get all Reviews :
exports.GetAllReviews = async (req,res,next)=>{
    try {
        const Reviews = await Review.find();
        const reviewCount = await Review.countDocuments();
        if(reviewCount === 0){
            return res.status(200).json({
                status:'success',
                Reviews:'there are no reviews yet'
            })
        }
        res.status(200).json({
            status:'success' ,
            TotalReviews : reviewCount,
            Reviews : Reviews
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//get Single Review :
exports.GetSingleReview = async (req,res,next) =>{
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({
            status:'success' ,
            Review : review
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(500).json({ error: error.message });
    }
}


//Update Review ;
exports.UpdateReview = async (req,res,next)=>{
    try {
        const { rating, comment } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { rating, comment }, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//Delete Review function
exports.deleteReview = async (req,res,next)=>{
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(500).json({ error: error.message });
    }
}
