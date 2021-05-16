// import connection
import db from "../config/database.js";
 
// Get All Projects
export const getProjects = (result) => {
    db.query("SELECT * FROM projects", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
