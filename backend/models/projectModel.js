// import connection
import db from "../config/database.js";
 
// Get All Projects
export const getProjects = (result) => {
    db.query("select p.projectName,p.marketCap, b.blockchainName, c.categoryName,p.description,p.inceptionDate from projects p, blockchains b, categories c ;", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert Project to Database
export const insertProject = (data, result) => {
    db.query("INSERT INTO projects SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
