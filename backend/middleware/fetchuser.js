const { request } = require('express');
const jwt =require('jsonwebtoken');
const jwt_token= "kartik"

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-Token');
    if(!token){
        return res.status(401).send({error:"please authenticate using a valid token"+token})
    }
    try{
        const data = jwt.verify(token,jwt_token)
        req.user=data.user
        next();
    }catch(error){
        return res.status(401).send({error:"please authentivate using a valid token"})
    }
}

module.exports=fetchuser;