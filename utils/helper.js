const FMsg = async (res,msg="success",result=[])=>{
    res.status(200).json({con:true,message:msg,result})

}

module.exports = {
    FMsg
}