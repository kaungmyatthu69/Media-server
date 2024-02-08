let DB = require('../models/post');
let CommentModel = require('../models/comment');
let Helper = require('../utils/helper');
const {del} = require("express/lib/application");
const {raw} = require("express");
const all =async (req,res,next)=>{
    let posts = await DB.find().populate('user category','-password -__v');
    Helper.FMsg(res,"All Posts",posts)

}
const create =async (req,res,next)=>{
    let userId = req.body.user._id;
    delete req.body.user;
    req.body['user'] = userId;
    let savePost = await  new DB(req.body).save();
    Helper.FMsg(res,"Post Created",savePost)

}

const getById =async (req,res,next)=>{
    let post = await DB.findById(req.params.id).populate('user category','-password -__v').select('-__v');
    if(post){
        let comments = await CommentModel.find({postId:post._id});
         post = post.toObject();
        post['comments'] = comments;
        Helper.FMsg(res,"Post By Id",post)
    }else {
        next(new Error('Error , No post with this id'))
    }

}

const deleteById =async (req,res,next)=>{
  let post = await DB.findById(req.params.id);
  if(post){
        await DB.findByIdAndDelete(post._id);
        Helper.FMsg(res,"Post Deleted")

  }else {
      next(new Error('Error , No post with this id'))

  }
}

const updateById =async (req,res,next)=>{
   let post = await DB.findById(req.params.id);
    if(post) {
        await DB.findByIdAndUpdate(post._id,req.body);
        let updatedPost = await DB.findById(post._id).populate('user category','-password -__v').select('-__v');
        Helper.FMsg(res,"Post Updated",updatedPost)
    }else {
        next(new Error('Error , No post with this id'))

    }

}

const getByCategory =async (req,res,next)=>{
    let posts = await DB.find({category:req.params.id}).populate('category','-password -__v');
    Helper.FMsg(res,"Posts By Category",posts)

}

const getByUser =async (req,res,next)=>{
    let posts = await DB.find({user:req.params.id}).populate('user','-password -__v');
    Helper.FMsg(res,"Posts By User",posts)

}

const getByTag=async (req,res,next)=>{
    let posts = await DB.find({tag:req.params.id})
    Helper.FMsg(res,"Posts By Tag",posts)
}
const paginate=async (req,res,next)=>{
    let page = req.params.page;
    let limit = Number(process.env.LIMIT);
    let skipNumber = (page-1)*limit;
    let posts = await DB.find().skip(skipNumber).limit(limit)
    Helper.FMsg(res,"Paginate",posts)
}

const toggleLike=async (req,res,next)=>{
    let post = await DB.findById(req.params.id);
    if(post){
        if(req.params.page === '1'){

            post.like = post.like+1;
        }else {
            post.like = post.like-1;
        }
        await DB.findByIdAndUpdate(post._id,post);
        let updatedPost = await DB.findById(post._id);
        Helper.FMsg(res,"Like toggle",updatedPost)
    }else {
        next(new Error('Error , No post with this id'))
    }
}
module.exports = {
    all,
    getById,
    create,
deleteById,
    updateById,
    getByCategory,
    getByUser,
    paginate,
    getByTag,
    toggleLike
}