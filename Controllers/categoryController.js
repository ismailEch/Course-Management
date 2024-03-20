const Category = require('../Models/categoryModel');

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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
}
//create Single Category function
exports.GetSingleCategory = async (req,res,next)=>{
    try {
        const OneCategory = await Category.findById(req.params.id);

        if (!OneCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({
            status:'success' ,
            Category : OneCategory
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(500).json({ error: error.message });
    }
}

//update Category function
exports.UpdateCategory = async (req,res,next)=>{
    try {
        const { name, description,  } = req.body;
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!updateCategory) {
            return res.status(404).json({ error: 'Categor not found' });
        }
        res.status(200).json({
            status:'update success' ,
            Category : updateCategory
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
}