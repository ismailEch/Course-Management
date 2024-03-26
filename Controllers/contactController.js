const Contact = require('../Models/contactModel');
const CustomError = require('../Utils/CustomError');

//create contact function
exports.CreateContact = async(req, res, next)=>{
    try{
        const { name, email, message} = req.body;
        const newContact = await Contact.create({name, email, message});
        res.status(201).json({
            status:'success',
            contact:newContact
        });
    }catch (error) {
        const err = new CustomError(error.message, 500);
        return next(err);
    }
}

//Get All Contact function
exports.getContact = async (req, res, next)=>{
    try {
        const contact = await Contact.find();
        const contactCount = await Contact.countDocuments();
        if(contactCount === 0){
            return res.status(200).json({
                status:'success',
                Reviews:'there are no Contact yet'
            })
        }
        res.status(200).json({
            status:'success',
            TotalContact :contactCount,
            contact : contact
        });
    }catch (error) {
        const err = new CustomError(error.message, 500);
        return next(err);
    }
}
//Get a single contact function
exports.GetSingleContact = async (req, res, next) =>{
    try{
        const OneContact = await Contact.findById(req.params.id);

        if(!OneContact){
            const err = new CustomError ('Contact not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'success' ,
            contact : OneContact

        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Contact not found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }

}

//update Contact function
exports.UpdateContact = async (req,res,next)=>{
    try {
        const { name, email, message} = req.body;
        const updateContact = await Contact.findByIdAndUpdate(req.params.id, { name, email, message }, { new: true });
        if (!updateContact) {
            const err = new CustomError ('Contact not found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'update success' ,
            Contact : updateContact
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Contact not found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//Delete Contact function
exports.deleteContact = async (req,res,next)=>{
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            const err = new CustomError ('Contact not found' , 404) ;
            return next (err);
        }
        res.status(200).json({ message: 'Contact deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Contact not found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}








