const { contains } = require('validator');
const Contact = require('../Models/contactModel');


//create contact function
exports.CreateContact = async(req, res, next)=>{
    try{
        const { name, email, message} = req.body;
        const newContact = await Contact.create({name, email, message});
        res.status(201).json({
            status:'create done',
            Contact:newContact
        });
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
}

//Get All Contact function
exports.getContact = async (req, res, next)=>{
    try {
        const contact = await Contact.find();
        res.status(200).json({
            status:'success',
            TotalContact : Contact.length,
            Contact : contact
        });
    }catch (error) {
        res.status(500).json({error: error.message});
    }
}
//create a single contact function
exports.GetSingleContact = async (req, res, next) =>{
    try{
        const OneContact = await Contact.findById(req.params.id);

        if(!OneContact){
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({
            status:'success' ,
            Contact : OneContact

        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(500).json({ error: error.message });
    }

}

//update Contact function
exports.UpdateContact = async (req,res,next)=>{
    try {
        const { name, email, message} = req.body;
        const updateContact = await Contact.findByIdAndUpdate(req.params.id, { name, email, message }, { new: true });
        if (!updateContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({
            status:'update success' ,
            Contact : updateContact
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//Delete Contact function
exports.deleteContact = async (req,res,next)=>{
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!Contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'contact not found' });
        }
        res.status(500).json({ error: error.message });
    }
}








