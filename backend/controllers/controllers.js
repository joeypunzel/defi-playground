// Import function from Project Model
import { getProjects,insertProject, getBlockchains, insertBlockchain } from "../models/models.js";
 
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