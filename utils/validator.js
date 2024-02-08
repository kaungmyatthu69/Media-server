let jwt = require('jsonwebtoken');
let userDB = require('../models/user');
const validateBody =(schema)=>{
    return(req,res,next)=>{
        let result = schema.validate(req.body);
        if(result.error){
            next(new Error(result.error.details[0].message))
        }else {
            next()
        }
    }

}

const paramsValidate=(schema,name)=>{
    return (req,res,next)=>{
        let obj ={}
        obj[`${name}`]= req.params[`${name}`];
        let result = schema.validate(obj);
        if(result.error) {
            next(new Error(result.error.details[0].message))
        }else {
            next()
        }
    }
}

const tokenValidate=async (req,res,next)=>{

    let token = req.headers.authorization;
    if(token){
        token = token.split(' ')[1]
        let user = jwt.decode(token,process.env.SECRET);
        if(user){
            req.body['user'] = await userDB.findById(user._id);
            next()
        }else {
            next(new Error('Token is invalid'))
        }
    }else {
        next(new Error('Token is required'))
    }

}
module.exports = {
    validateBody,
    paramsValidate,
    tokenValidate
}