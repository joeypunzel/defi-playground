const db = require("../config/database.js");
const express = require('express');
const router = express.Router();
const controllers = require("../controllers/controllers.js")

// Get All Project
router.get('/projectList',controllers.showProjects);

// Create New Project
router.post('/projectList', controllers.createProject);

// Update Project
router.post('/updateProject', controllers.alterProject);

// Delete Project
router.post('/deleteProject', controllers.deleteProject);

// Get All Blockchains
router.get('/blockchainList', controllers.showBlockchains);

// Create New Blockchain
router.post('/blockchainList', controllers.createBlockchain);

// Update Blockchain
router.post('/updateBlockchain', controllers.alterBlockchain);

// Delete Blockchain
router.post('/deleteBlockchain', controllers.deleteBlockchain);

// Get All Categories
router.get('/categoryList', controllers.showCategories);

// Create New Category
router.post('/categoryList', controllers.createCategory);

// Update Category
router.post('/updateCategory', controllers.alterCategory);

// Delete Category
router.post('/deleteCategory', controllers.deleteCategory);

// Get All Users
router.get('/userList', controllers.showUsers);

// Create New User
router.post('/userList', controllers.createUser);

// Update User 
router.post('/updateUser', controllers.alterUser);

// Delete New User
router.post('/deleteUser', controllers.deleteUser);

// Get All Favorites
router.get('/favoriteList', controllers.showFavorites);

// Create New Favorite
router.post('/favoriteList', controllers.createFavorite);

// Delete Favorite
router.post('/deleteFavorite', controllers.deleteFavorite);

module.exports = router;