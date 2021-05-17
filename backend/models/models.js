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

// Get All Blockchains
export const getBlockchains = (result) => {
    db.query("select blockchainName from blockchains", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert Blockchain
export const insertBlockchain = (data, result) => {
    db.query("INSERT INTO blockchains SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Get All Categories
export const getCategories = (result) => {
    db.query("select categoryName from categories", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert Category
export const insertCategory = (data, result) => {
    db.query("INSERT INTO categories SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Get All Users
export const getUsers = (result) => {
    db.query("select userName,isAdmin from users", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert User
export const insertUser = (data, result) => {
    db.query("INSERT INTO users SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

