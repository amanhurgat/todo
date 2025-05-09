const jwt=require('jsonwebtoken');
const User=require('../Models/User.model');

const verifyToken=(req,res,next)=>{
    console.log('Middleware called');
    const token=req.headers['authorization'];
    if(!token){
        return res.status(403).json({message:'No token provided'});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.userId=decoded.id;
        next();
    });
}

module.exports={
    verifyToken
}
