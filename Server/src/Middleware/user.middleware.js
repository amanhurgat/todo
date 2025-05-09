const jwt=require('jsonwebtoken');
const User=require('../Models/User.model');

const verifyToken=async (req,res,next)=>{
    console.log('Middleware called');
    const token =await req.headers.authorization?.split(' ')[1];
    console.log('Token:',token);
    req.token=token
    if(!token){
        return res.status(403).json({message:'No token provided'});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:'Unauthorized',success:false});
        }
        req.userId=decoded.id;
        next();
    });
}

module.exports={
    verifyToken
}
