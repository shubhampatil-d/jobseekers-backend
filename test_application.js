import dotenv from "dotenv"
import mongoose from "mongoose"
import Application from "./models/Application.js"
import Jobs from "./models/Jobs.js"
import User from "./models/User.js"

dotenv.config()
console.log("server starting")

const test= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected ")

        const userId=new mongoose.Types.ObjectId()
        const jobId= new mongoose.Types.ObjectId()

        const app = new Application({
            job:jobId,
            user: userId,
            resume: "/uploads/resume.pdf"
            }
        )
        await app.save()
        console.log("application saved",app)

        await mongoose.disconnect()
   
    }catch(error){
        console.error("test failed",error.message)
    }
    

}

test()