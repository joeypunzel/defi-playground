// import express
import express from "express";
 
// import function from controller
import { showProjects } from "../controllers/projects.js";
 
// init express router
const router = express.Router();
 
// Get All Project
router.get('/projectList', showProjects);
 
 
// export default router
export default router;
