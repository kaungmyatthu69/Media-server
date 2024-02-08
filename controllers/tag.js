const TagModel = require('../models/tag');
const Helper = require('../utils/helper');
const all =async (req,res,next)=>{
    let tags = await TagModel.find();
    Helper.FMsg(res,"All Tags",tags)
}

const create=async (req,res,next)=>{
    let tag = await TagModel.findOne({name:req.body.name});
    if(tag){
        next(new Error('Tag already exist'))
    }else {
       let newTag= await new TagModel(req.body).save();
        Helper.FMsg(res,"Tag Created",newTag)
    }
}

const getById =async (req,res,next)=>{
    let tag = await TagModel.findById(req.params.id);
    if(tag){
        Helper.FMsg(res,"Tag By Id",tag)
    }else {
        next(new Error('Error , No tag with this id'))
    }
}

const updateById =async (req,res,next)=>{
    let tag = await TagModel.findById(req.params.id);
    if(tag){
       await TagModel.findByIdAndUpdate(tag._id,req.body);
       let updatedTag = await TagModel.findById(tag._id);
        Helper.FMsg(res,"Tag Updated",updatedTag)
    }else {
        next(new Error('Error , No tag with this id'))
    }
}


const deleteById = async (req,res,next)=>{
    let tag = await TagModel.findById(req.params.id);
    if(tag)
    {
        await TagModel.findByIdAndDelete(tag._id);
        Helper.FMsg(res,"Tag Deleted")
    }else {
        next(new Error('Error , No tag with this id'))

    }
}

module.exports = {
    all,
    create,
    getById,
    updateById,
    deleteById

}