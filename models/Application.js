import mongoose from "mongoose";

const applicationSchema= new mongoose.Schema({
    job: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    user:{type: mongoose.Schema.Types.ObjectId, ref:"Job"},
    resume:String
}, {timestamps:true})

export default mongoose.model("Application", applicationSchema)