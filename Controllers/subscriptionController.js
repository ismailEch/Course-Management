const Subscription = require("../Models/subscriptionModel");

//create Substraction function
exports.CreateSubscription = async(req, res, next)=>{
    try{
        const {teacher, plan, status} = req.body;
        const newSubscription = await Subscription.create({teacher, plan, status});
        res.status(201).json({
            status:'create done',
            Subscription:newSubscription
        });
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
}
//Get All Subscriptions function
exports.GetSubscription = async (req, res, next) =>{
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({
            status:'success' ,
            TotalSubscriptions : subscriptions.length,
            Subscription : subscriptions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//create Single Subscription function
exports.GetSingleSubscription = async (req,res,next)=>{
    try {
        const OneSubscription = await Subscription.findById(req.params.id);

        if (!OneSubscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        res.status(200).json({
            status:'success' ,
            Subscription : OneSubscription
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//update Subscription function
exports.UpdateSubscription = async (req,res,next)=>{
    try {
        const { teacher, plan, status } = req.body;
        const UpdateSubscription = await Subscription.findByIdAndUpdate(req.params.id, { teacher, plan, status }, { new: true });
        if (!UpdateSubscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        res.status(200).json({
            status:'update success',
            Subscription : UpdateSubscription
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//Delete Subscription function
exports.deleteSubscription = async (req,res,next)=>{
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        res.status(200).json({ message: 'Subscription deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Subscription not found' });
        }
        res.status(500).json({ error: error.message });
    }
}