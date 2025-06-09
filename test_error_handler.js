import express from "express";
import errorHandler from "./middlewares/errorHandler.js";

const app= express()

app.get("/",(res, req) =>{
    throw new Error ("this is test error")

})

app.use(errorHandler)
const PORT=5000
app.listen(PORT,()=>{
    console.log("server is running")
})