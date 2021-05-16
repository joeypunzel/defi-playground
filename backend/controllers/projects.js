// Import function from Project Model
import { getProjects } from "../models/projectModel.js";
 
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
