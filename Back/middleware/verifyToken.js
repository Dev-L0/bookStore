import jwt from 'jsonwebtoken';

export const verifyToken = (req,res, next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({success: false, message: "unauthorized no token provided"});
    try{
    const decoded =jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) return res.status(401).json({success:false, message:"Invalid token"});
    req.userId = decoded.userId;
    req.user = { id: decoded.userId, role: decoded.role };
    next();
    }
    catch(error){
        console.log("Error in verifyToken", error);
        return res.status(500).json({success:false, message:"Internal server error"});
    }
}


export const adminRoute = (req, res, next)=>{
    if(req.user && req.user.role === 'admin'){
        next();
    } else{
        return res.status(403).json({success:false, message:"Access denied"});
    }
}