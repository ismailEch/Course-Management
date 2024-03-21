const Category = require('../Models/categoryModel');
const CustomError = require('../Utils/CustomError');


//create Category function
exports.CreateCategory  = async(req,res,next)=>{
    try {
        const { name, description } = req.body;
        const newCategory = await Category.create({ name, description });
        res.status(201).json({
            status:'create done',
            Category:newCategory
        });
    } catch (error) {
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }

}
//Get All Category function
exports.GetCategories = async (req,res,next)=>{
    try {
        const Categories = await Category.find();
        res.status(200).json({
            status:'success' ,
            TotalCategories : Categories.length,
            Categories : Categories
        });
    } catch (error) {
        const err = new CustomError (error.message , 500) ;
        return next (err);;
    }
}
//create Single Category function
exports.GetSingleCategory = async (req,res,next)=>{
    try {
        const OneCategory = await Category.findById(req.params.id);

        if (!OneCategory) {
            const err = new CustomError ('Category Not Found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'success' ,
            Category : OneCategory
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Category Not Found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//update Category function
exports.UpdateCategory = async (req,res,next)=>{
    try {
        const { name, description,  } = req.body;
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!updateCategory) {
            const err = new CustomError ('Category Not Found' , 404) ;
            return next (err);
        }
        res.status(200).json({
            status:'update success' ,
            Category : updateCategory
        });
    } catch (error) {
        if (error.name === 'CastError') {
            const err = new CustomError ('Category Not Found' , 404) ;
            return next (err);
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}

//Delete Category function
exports.deleteCategory = async (req,res,next)=>{
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Category not found' });
        }
        const err = new CustomError (error.message , 500) ;
        return next (err);
    }
}