const Plan = require('../Models/planModel')
const CustomError = require('../Utils/CustomError');

//create Plan function
exports.CreatePlane = async(req, res, next)=>{
    try{
        const { name, price, description, features} = req.body;
        const newPlan = await Plan.create({name, price, description, features});
        res.status(201).json({
            status:'success',
            Plan:newPlan
        });
    }catch (error) {
        const err = new CustomError(error.message, 500);
        return next(err);
    }
}

//Get All Plans function
exports.GetPlans = async (req, res, next) =>{
    try {
        const plans = await Plan.find();
        const PlanCount = await Plan.countDocuments();
        if(PlanCount === 0){
            return res.status(200).json({
                status:'success',
                Reviews:'there are no Plan yet'
            })
        }
        res.status(200).json({
            status:'success' ,
            TotalPlans : PlanCount,
            Plan : plans
        });
    } catch (error) {
        const err = new CustomError(error.message, 500);
        return next(err);
    }
}

//Get Single Plan function
exports.GetSinglePlan = async (req,res,next)=>{
    try {
        const OnePlan = await Plan.findById(req.params.id);

        if (!OnePlan) {
            const err = new CustomError ('Plan not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'success' ,
            Plan : OnePlan
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Plan not found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//update Plan function
exports.UpdatePlan = async (req,res,next)=>{
    try {
        const { name, price, description, features } = req.body;
        const updatePlan = await Plan.findByIdAndUpdate(req.params.id, { name, price, description, features }, { new: true });
        if (!updatePlan) {
            const err = new CustomError ('Plan not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'update success',
            Plan : updatePlan
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Plan not found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//Delete Plan function
exports.deletePlan = async (req,res,next)=>{
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id);
        if (!plan) {
            const err = new CustomError ('Plan not found' , 404) ;
            return next (err);
        }
        res.status(200).json({ message: 'Plan deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Plan not found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}