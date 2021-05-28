const models = require("../models/models.js")


// Get All Projects
const showProjects = (req, res) => {
    models.getProjects((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Project
const createProject = (req, res) => {
    const data = req.body;
    models.insertProject(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update Project
const alterProject = (req, res) => {
    const data = req.body;
    models.updateProject(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete Project
const deleteProject = (req, res) => {
    const data = req.body;
    models.removeProject(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Blockchains
const showBlockchains = (req, res) => {
    models.getBlockchains((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Blockchain
const createBlockchain = (req, res) => {
    const data = req.body;
    models.insertBlockchain(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update Blockchain
const alterBlockchain = (req, res) => {
    const data = req.body;
    models.updateBlockchain(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete Blockchain
const deleteBlockchain = (req, res) => {
    const data = req.body;
    models.removeBlockchain(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Categories
const showCategories = (req, res) => {
    models.getCategories((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Category
const createCategory = (req, res) => {
    const data = req.body;
    models.insertCategory(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update Category
const alterCategory = (req, res) => {
    console.log("test - controller")
    const data = req.body;
    models.updateCategory(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete Category
const deleteCategory = (req, res) => {
    const data = req.body;
    models.removeCategory(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Users
const showUsers = (req, res) => {
    models.getUsers((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New User
const createUser = (req, res) => {
    const data = req.body;
    models.insertUser(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update User
const alterUser = (req, res) => {
    const data = req.body;
    models.updateUser(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete User
const deleteUser = (req, res) => {
    const data = req.body;
    models.removeUser(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Favorites
const showFavorites = (req, res) => {
    models.getFavorites((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Favorite
const createFavorite = (req, res) => {
    const data = req.body;
    models.insertFavorite(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete Favorite
const deleteFavorite = (req, res) => {
    const data = req.body;
    models.removeFavorite(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

module.exports = { 
    showProjects,createProject,deleteProject, alterProject, showBlockchains, createBlockchain, alterBlockchain, deleteBlockchain, showCategories, createCategory, alterCategory, deleteCategory, showUsers, createUser, alterUser, deleteUser, showFavorites, createFavorite, deleteFavorite
 };