const Course = require('../Models/courseModel');
const CustomError = require('../Utils/CustomError');


//add like to course
exports.addLike = async (req, res, next) => {
    let UserId = req.user._id
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: UserId }
        },
            { new: true }
        );
        res.status(200).json({
            success: true,
            course
        })

    } catch (error) {
        const err = new CustomError (error.message, 500) ;
        return next (err);
    }

}
//remove like 
exports.removeLike = async (req, res, next) => {

    try {
        const course = await Course.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.user._id }
        },
            { new: true }
        );
        res.status(200).json({
            success: true,
            course
        })

    } catch (error) {
        const err = new CustomError (error.message, 500) ;
        return next (err);
    }

}
exports.getCoursesLikedByUser = async (req, res, next) => {
    let userId = req.user._id

    try {
        const coursesLikedByUser = await Course.find({ likes: userId }).populate('instructor').populate('Category').populate('likes');
        res.status(200).json({
            success: true,
            TotalLikeCourses : coursesLikedByUser.length,
            coursesLikedByUser
        });
    } catch (error) {
        const err = new CustomError(error.message, 500);
        return next(err);
    }
};
