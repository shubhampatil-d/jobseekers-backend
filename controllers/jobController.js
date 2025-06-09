import { compare } from "bcryptjs"
import Jobs from "../models/Jobs.js"

export const createJob=async (req, res)=>{
    try{
        const {title, description, company, location, salary} = req.body
        const job= new Jobs({
            title,
            description,
            company,
            location,
            salary,
            postedBy:req.user._id
        })
        await job.save()
        res.status(201).json({message:"job create successfully", job})

    }catch (error){
        res.status(500).json({message:"server error"})

    }
}

export const getAllJobs= async (req,res)=>{
    try{    
        const jobs= await Jobs.find().populate("postedBy","name email")
        res.status(200).json(jobs)

    }catch(error){
        res.status(500).json({message: "server error"})
    }
}


export const getJobById= async (req,res) =>{
    try{
        const job= await Jobs.findById(req.params.id).populate("postedBy","name email")
        if (!job) return res.status(404).json({message:"Job not found "})
        res.status(200).json(job)

    }catch(error){
        res.status(500).json({message:"server Error"})
    }
}

export const deleteJob= async(req, res) =>{
    try{
        const job= await Jobs.findById( req.params.id)
        if (!job) return res.status(404).json({message: "Job id not found"})
        if (job.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Your are not authorized to delete"})
        }
        await job.deleteOne()
        res.status(200).json({message:"deleted successfully"})
    }catch(error){
            res.status(500).json({message:"server error"})
        }
    

}