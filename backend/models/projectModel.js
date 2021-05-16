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
