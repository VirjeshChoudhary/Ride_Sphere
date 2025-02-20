const userModel=require('../models/userModel');
const jwt = require('jsonwebtoken');
const BlacklistToken=require('../models/blacklistTokenModel');
const captainModel = require('../models/captainModel'); // Ensure captainModel is imported

module.exports.authUser=async (req,res,next)=>{
    try {
        const token= req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
        const isBlacklisted=await BlacklistToken.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({message:'Unauthorized'});
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decode._id);
        req.user=user;
        return next();

    } catch (error) {
        return res.status(401).json({message:'Unauthorized'});
    }
}
module.exports.authCaptain=async (req,res,next)=>{
    try {
        const token= req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
        const isBlacklisted=await BlacklistToken.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({message:'Unauthorized'});
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decode._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.captain=captain;
        return next();

    } catch (error) {
        return res.status(401).json({message:'Unauthorized'});
    }
}
