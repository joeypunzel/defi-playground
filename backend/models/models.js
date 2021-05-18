// import connection
import db from "../config/database.js";
 
// Get All Projects
export const getProjects = (result) => {
    db.query("select p.projectID,p.projectName,p.marketCap, b.blockchainName,c.categoryName, p.description,p.inceptionDate from projects p left join blockchains b on p.blockchainID = b.blockchainID left join categories c on p.categoryID = c.categoryID;;", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert Project
export const insertProject = (data, result) => {
    let ugly = [data.projectName, data.marketCap, data.blockchainName, data.categoryName, data.description, data.inceptionDate]
    db.query("INSERT INTO projects(projectName,marketCap,blockchainID,categoryID,description,inceptionDate) VALUES(?,?,(select blockchainID from blockchains where blockchainName = ?),(select categoryID from categories where categoryName = ?),?,?)",ugly, (err, results) => {             
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

// Get All Favorites
export const getFavorites = (result) => {
    db.query("select c.projectName,c.marketCap,x.blockchainName,y.categoryName,c.projectName,c.description from favorites a left join users b on a.userID = b.userID left join projects c on a.projectID = c.projectID left join blockchains x on c.blockchainID = x.blockchainID left join categories y on c.categoryID = y.categoryID;", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert Favorite
export const insertFavorite = (data,result) => {
    db.query("insert into favorites (userID,projectID) VALUES ((select userID from users where userID=1),(select projectID from projects where ?))",[data], (err, results) => {             
        if(err) {
            console.log(err);
            console.log(result)
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
