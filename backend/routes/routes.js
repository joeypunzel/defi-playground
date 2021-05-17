// import express
import express from "express";
 
// import function from controller
import { showProjects,createProject, showBlockchains, createBlockchain } from "../controllers/controllers.js";
 
// init express router
const router = express.Router();
 
// Get All Project
router.get('/projectList', showProjects);

// Create New Project
router.post('/projectList', createProject);

// Get All Project
router.get('/blockchainList', showBlockchains);

// Create New Project
router.post('/blockchainList', createBlockchain);

// export default router
export default router;
