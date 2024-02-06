let DB = require('../dbs/post');
let Helper = require('../utils/helper');
const all =async (req,res,next)=>{
    let posts = await DB.find().populate('user','-password -__v');
    Helper.FMsg(res,"All Posts",posts)

}
const create =async (req,res,next)=>{
    let savePost = await  new DB(req.body).save();
    Helper.FMsg(res,"Post Created",savePost)

}

const getById =async (req,res,next)=>{
    let post = await DB.findById(req.params.id).populate('user');
    if(post){
        Helper.FMsg(res,"Post By Id",post)
    }else {
        next(new Error('Error , No post with this id'))
    }

}

const deleteById =async (req,res,next)=>{
    res.json("delected post is " + req.params.id)

}

const updateById =async (req,res,next)=>{
    res.json({"message":req.body})

}

module.exports = {
    all,
    getById,
    create,
deleteById,
    updateById
}