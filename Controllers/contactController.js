const Contact = require('../Models/contactModel');
const Contact = require('../Models/contactModel');


//create contact function
exports.CreateContact = async(req, res, next)=>{
    try{
        const { name, email, message} = req.body;
        const newContact = await Contact.create({name, email, message});
        res.status(201).json({
            status:'create done',
            Category:newCategory
        });
    }catch (error) {
        res.status(500).json({ error: error.message});
    }
}

//Get All Contact function
exports.getContact = async (req, res, next)=>{
    try {
        const Contact = await Contact.find();
        res.status(200).json({
            status:'success',
            TotalContact : Contact.length,
            Contact : Contact
        });
    }catch (error) {
        res.status(500).json({error: error.message});
    }
}