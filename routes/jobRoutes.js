import express from "express";
import { createJob } from "../controllers/jobController.js";
import protect from "../middlewares/auth.js"
import checkRole from "../middlewares/role.js";

const route = express.Router()
route.post("/",protect,checkRole("employer"), createJob)
export default route