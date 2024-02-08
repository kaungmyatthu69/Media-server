let DB = require('../models/user');
let helper = require('../utils/helper');
// const all = async (req,res,next)=>{
//     let users = await DB.find();
//     helper.FMsg(res,"All Users",users)
// }
//
// const create = async (req,res,next)=>{
//     let saveUser = new DB(req.body);
//     let result = await saveUser.save();
//     helper.FMsg(res,"User Created",result)
//
// }
// const getById = async (req,res,next)=>{
//     let user = await DB.findById(req.params.id);
//     if(user)
//     {
//         helper.FMsg(res,"User By Id",user)
//     }else {
//         next(new Error('Error , No user with this id'))
//     }
//
// }
//
// const deleteById = async (req,res,next)=>{
//     await  DB.findByIdAndDelete(req.params.id)
//     helper.FMsg(res,"User Deleted")
// }
//
// const updateById = async (req,res,next)=>{
//     let user = await DB.findById(req.params.id)
//     if(user){
//         await DB.findByIdAndUpdate(user._id,req.body)
//         let updatedUser = await DB.findById(user._id)
//         helper.FMsg(res,"User Updated",updatedUser)
//     }else {
//         next(new Error('Error , No user with this id'))
//     }
//
// }


const login = async (req,res,next)=>{
   let userPhone = await DB.findOne({phone:req.body.phone}).select('-__v');
    if(userPhone)
    {
        let comparePassword = helper.comparePassword(req.body.password,userPhone.password)
        let user = userPhone.toObject()
        delete  user.password
        user.token = helper.makeToken(user)
        if(comparePassword) {
            helper.FMsg(res, "User Login In", user)
        }else {
            return  next(new Error('Creditial error'))
        }

    }else {
        return next(new Error('Creditial error'))

    }
}

const register = async (req,res,next)=>{
    let endcodedPassword = helper.encode(req.body.password);
    let name = await  DB.findOne({name: req.body.name})
    if(name){
        return next(new Error('Error , User with this name already exists'))
    }
    let email = await  DB.findOne({email:req.body.email})
    if(email){
        return next(new Error('Error , User with this email already exists'))
    }
let phone = await  DB.findOne({phone:req.body.phone})
    if(phone){
        return next(new Error('Error , User with this phone already exists'))
    }

    req.body.password = endcodedPassword;
    let saveUser = await  new DB(req.body).save();

    helper.FMsg(res,"User Register In",saveUser);
}
module.exports = {
    login,
    register

}