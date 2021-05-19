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

module.exports = { 
    showProjects,createProject, showBlockchains, createBlockchain, showCategories, createCategory, showUsers, createUser, showFavorites, createFavorite
 };