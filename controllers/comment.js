const CommentModel = require('../models/comment');
const Helper = require('../utils/helper');
const add=async (req,res,next)=> {
    delete req.body.user;
    let comment = await new CommentModel(req.body).save();
    Helper.FMsg(res, "Comment Created", comment)
}

const all = async (req,res,next)=>{
    let comments = await CommentModel.find({postId:req.params.id});
    Helper.FMsg(res,"All Comments",comments)
}
const drop = async (req,res,next)=>{
    let comment = await CommentModel.findById(req.params.id);
    if(comment){
        await CommentModel.findByIdAndDelete(comment._id);
        Helper.FMsg(res,"Comment Deleted")
    }else {
        next(new Error('Error , No comment with this id'))
    }

}

module.exports = {
    add,
    all,
    drop
}