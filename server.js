import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
// import userR
import errorHandler from "./middlewares/errorHandler.js";
import fileUpload from "express-fileupload";
import jobRoutes from "./routes/jobRoutes.js"


dotenv.config();
connectDB();

const app= express();

app.use(express.json())
app.use(fileUpload())
app.use("/uploads", express.static("uploads"))
app.use("/api/auth", authRoutes)

app.use("/api/jobs",jobRoutes)
    
app.get("/", (req, res)=>{
    res,send("API is working")

})
app.use(errorHandler)




const PORT= process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));

// before above two lines app.get("/", (res,req)=>{
//     req.send("App is running");
// });