// import express
import express from "express";
 
// import function from controller
import { showProjects,createProject, showBlockchains, createBlockchain, showCategories, createCategory, showUsers, createUser, showFavorites, createFavorite } from "../controllers/controllers.js";
 
// init express router
const router = express.Router();
 
// Get All Project
router.get('/projectList', showProjects);

// Create New Project
router.post('/projectList', createProject);

// Get All Blockchains
router.get('/blockchainList', showBlockchains);

// Create New Blockchain
router.post('/blockchainList', createBlockchain);

// Get All Categories
router.get('/categoryList', showCategories);

// Create New Blockchain
router.post('/categoryList', createCategory);

// Get All Users
router.get('/userList', showUsers);

// Create New User
router.post('/userList', createUser);

// Get All Favorites
router.get('/favoriteList', showFavorites);

// Create New Favorite
router.post('/favoriteList', createFavorite);

// export default router
export default router;
