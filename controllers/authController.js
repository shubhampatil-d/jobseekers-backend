import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const register =async(req, res ) =>{
    const {name, email, password, role} = req.body
    try{
        const existinguser= await User.findOne({email})
        if (existinguser) return res.status(400).json({message:"Email already exits"})
        
        const hashedpassword= await bcrypt.hash(password,10)
        const user= new User({name,email,password:hashedpassword,role})
        await user.save()
        res.status(201).json({message: "user register successfully"})
    }catch (err){
        res.status(500).json({message:"Server Error"})
    }
    
}

export const login = async(req, res) =>{
    const {email,password}= req.body
    try{
        const user= await User.findOne({email})
        if (!user) return res.status(400).json({message:"email not register"})

        const isPasswordCorrect= await bcrypt.compare(password,user.password)
        if (!isPasswordCorrect) return res.status(400).json({message:"password not matched"})
    
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"1d"})
        res.json({token}) 
    }catch (err){
        console.error("login error",err)
        res.status(500).json({message: "Server error"})
        }
    }