// import express
import express from "express";
 
// import function from controller
import { showProjects,createProject } from "../controllers/projects.js";
 
// init express router
const router = express.Router();
 
// Get All Project
router.get('/projectList', showProjects);

// Create New Project
router.post('/projectList', createProject);

// export default router
export default router;
