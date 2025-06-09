import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect= async( req,res, next)=>{
    const token= req.header.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({message: "no token, access denied"})
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user= await findById(decoded.id.select("-password"))
        next()
}catch (error){
    res.status(401).json({message: "invalid token, access denied"})
}
}

export default protect
