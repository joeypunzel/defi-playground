// Import function from Project Model
import { getProjects,insertProject } from "../models/projectModel.js";
 
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