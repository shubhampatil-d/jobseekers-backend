import mongoose from "mongoose"


const jobSchema= new mongoose.Schema({
    title: String,
    description : String,
    company: String,
    location: String,
    salary: Number,
    postedBy: {type:mongoose.Schema.Types.ObjectId, ref:"User"} 
// postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

}, {timestamp:true})

export default mongoose.model("Job",jobSchema)
