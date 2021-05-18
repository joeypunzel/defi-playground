// Import function from Project Model
import { getProjects,insertProject, getBlockchains, insertBlockchain, getCategories, insertCategory, getUsers, insertUser, insertFavorite, getFavorites } from "../models/models.js";
 
// Get All Projects
export const showProjects = (req, res) => {
    getProjects((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Project
export const createProject = (req, res) => {
    const data = req.body;
    insertProject(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Blockchains
export const showBlockchains = (req, res) => {
    getBlockchains((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Blockchain
export const createBlockchain = (req, res) => {
    const data = req.body;
    insertBlockchain(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Categories
export const showCategories = (req, res) => {
    getCategories((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Category
export const createCategory = (req, res) => {
    const data = req.body;
    insertCategory(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Users
export const showUsers = (req, res) => {
    getUsers((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New User
export const createUser = (req, res) => {
    const data = req.body;
    insertUser(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get All Favorites
export const showFavorites = (req, res) => {
    getFavorites((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Favorite
export const createFavorite = (req, res) => {
    const data = req.body;
    insertFavorite(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}