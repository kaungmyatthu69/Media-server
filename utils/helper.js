const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FMsg = async (res,msg="success",result=[])=>{
    res.status(200).json({con:true,message:msg,result})

}

const encode=(passowrd)=>{
    return bcrypt.hashSync(passowrd,10);
}
const comparePassword= (password,hash)=>{
    return bcrypt.compareSync(password,hash);
}
const makeToken = (payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: '1h'})
}
module.exports = {
    FMsg,
    encode,
    comparePassword,
    makeToken
}