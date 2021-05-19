const db = require("../config/database.js");
const express = require('express');
const router = express.Router();
const controllers = require("../controllers/controllers.js")

// Get All Project
router.get('/projectList',controllers.showProjects);

// Create New Project
router.post('/projectList', controllers.createProject);

// Get All Blockchains
router.get('/blockchainList', controllers.showBlockchains);

// Create New Blockchain
router.post('/blockchainList', controllers.createBlockchain);

// Get All Categories
router.get('/categoryList', controllers.showCategories);

// Create New Blockchain
router.post('/categoryList', controllers.createCategory);

// Get All Users
router.get('/userList', controllers.showUsers);

// Create New User
router.post('/userList', controllers.createUser);

// Get All Favorites
router.get('/favoriteList', controllers.showFavorites);

// Create New Favorite
router.post('/favoriteList', controllers.createFavorite);

module.exports = router;