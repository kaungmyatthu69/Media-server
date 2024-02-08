let Category = require('../models/category');
let Helper = require('../utils/helper');
const {raw} = require("express");

const all =async (req,res,next)=>{
    let categories = await Category.find();
    Helper.FMsg(res,"All Categories",categories)

}

const create =async (req,res,next)=>{
    let dbCategory = await Category.findOne({name:req.body.name});
    if(dbCategory)
    {
        return  next(new Error('Category already exist'))

    }
    let saveCategory = await  new Category(req.body).save();
    Helper.FMsg(res,"Category Created",saveCategory)

}

const getById =async (req,res,next)=>{
    let category = await Category.findById(req.params.id);
    if(category){
        Helper.FMsg(res,"Category By Id",category)
    }else {
        next(new Error('Error , No category with this id'))
    }


}

const updateById =async (req,res,next)=>{
    let updateCategory =await Category.findById(req.params.id)
    if(updateCategory)
    {
       await Category.findByIdAndUpdate(updateCategory._id,req.body)
        let updatedCategory = await Category.findById(req.params.id);
            Helper.FMsg(res,"Category Updated",updatedCategory)


    }else {
        next(new Error('Error , No category with this id'))
    }
}

const deleteById =async (req,res,next)=>{
    let deleteCategory = await Category.findById(req.params.id);

    if(deleteCategory){
        await Category.findByIdAndDelete(deleteCategory._id);
        Helper.FMsg(res,"Category Deleted",deleteCategory)
    }else {
        next(new Error('Error , No category with this id'))

    }
}
module.exports = {
    all,
    create,
    getById,
    updateById,
    deleteById
}