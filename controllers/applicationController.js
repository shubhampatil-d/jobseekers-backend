import Application from "../models/Application.js";

export const applyJob= async (req, res ) => {
    try{
        const userId= req.user._id
        const jobId= req.params.id 

        const alreadyApplied= await Application.findOne({job: jobId,user:userId})
        if (alreadyApplied) return res.status(400).json({message: "You have already applied to this job."})
            
        const application = new Application({
            job: jobId,
            user: userId,
            resume: req.user.resume || "NA"

        })
        await application.save()
        res.status(201).json({message: "Successfully applied"})
    }catch(error){
        res.status(500).json({message:"server error"})
        
    }
}