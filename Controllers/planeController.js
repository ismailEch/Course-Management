const Plan = require('../Models/planModel')


//create Plan function
exports.CreatePlane = async(req, res, next)=>{
    try{
        const { name, price, description, features} = req.body;
        const newPlan = await Plan.create({name, price, description, features});
        res.status(201).json({
            status:'create done',
            Plan:newPlan
        });
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
}
//Get All Plans function
exports.GetPlans = async (req, res, next) =>{
    try {
        const plans = await Plan.find();
        res.status(200).json({
            status:'success' ,
            TotalPlans : plans.length,
            Plan : plans
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//create Single Plan function
exports.GetSinglePlan = async (req,res,next)=>{
    try {
        const OnePlan = await Plan.findById(req.params.id);

        if (!OnePlan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(200).json({
            status:'success' ,
            Plan : OnePlan
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//update Plan function
exports.UpdatePlan = async (req,res,next)=>{
    try {
        const { name, price, description, features } = req.body;
        const updatePlan = await Plan.findByIdAndUpdate(req.params.id, { name, price, description, features }, { new: true });
        if (!updatePlan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(200).json({
            status:'update success',
            Plan : updatePlan
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//Delete Plan function
exports.deletePlan = async (req,res,next)=>{
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(200).json({ message: 'Plan deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Plan not found' });
        }
        res.status(500).json({ error: error.message });
    }
}