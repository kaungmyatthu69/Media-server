let DB = require('../dbs/user');
let helper = require('../utils/helper');
const all = async (req,res,next)=>{
    let users = await DB.find();
    helper.FMsg(res,"All Users",users)
}

const create = async (req,res,next)=>{
    let saveUser = new DB(req.body);
    let result = await saveUser.save();
    helper.FMsg(res,"User Created",result)

}
const getById = async (req,res,next)=>{
    let user = await DB.findById(req.params.id);
    if(user)
    {
        helper.FMsg(res,"User By Id",user)
    }else {
        next(new Error('Error , No user with this id'))
    }

}

const deleteById = async (req,res,next)=>{
    await  DB.findByIdAndDelete(req.params.id)
    helper.FMsg(res,"User Deleted")
}

const updateById = async (req,res,next)=>{
    let user = await DB.findById(req.params.id)
    if(user){
        await DB.findByIdAndUpdate(user._id,req.body)
        let updatedUser = await DB.findById(user._id)
        helper.FMsg(res,"User Updated",updatedUser)
    }else {
        next(new Error('Error , No user with this id'))
    }

}

module.exports = {
    all,
    getById,
    create,
    updateById,
    deleteById
}