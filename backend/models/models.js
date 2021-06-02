// import connection
const db = require("../config/database.js");
 
// Get All Projects
const getProjects = (result) => {
    db.query("select p.projectID,p.projectName,p.marketCap, b.blockchainName,c.categoryName, p.description,p.inceptionDate from projects p left join blockchains b on p.blockchainID = b.blockchainID left join categories c on p.categoryID = c.categoryID;", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert Project
const insertProject = (data, result) => {
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

// Update Project
const updateProject = (data, result) => {
    let cond = [data.projectName, data.marketCap, data.blockchainName, data.categoryName, data.description, data.inceptionDate, data.origProjectName]
    db.query("UPDATE projects SET projectName = ?, marketCap = ?,blockchainID=(select blockchainID from blockchains where blockchainName = ?),categoryID=(select categoryID from categories where categoryName = ?),description = ?, inceptionDate = ? where projectName = ?",cond, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Delete Project
const removeProject = (data, result) => {
    let cond = [data.projectName]
    db.query("DELETE FROM favorites where projectID in (select projectID from projects where projectName = ?)", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } 
    });
    db.query("DELETE FROM projects where projectName = ?", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } 
    });     
}

// Get All Blockchains
const getBlockchains = (result) => {
    db.query("select blockchainName from blockchains", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Update Blockchain
const updateBlockchain = (data, result) => {
    let cond = [data.blockchainName, data.origBlockchainName]
    db.query("UPDATE blockchains SET blockchainName = ? where blockchainName = ?",cond, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert Blockchain
const insertBlockchain = (data, result) => {
    db.query("INSERT INTO blockchains SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Delete Blockchain
const removeBlockchain = (data, result) => {
    let cond = [data.blockchainName]
    db.query("DELETE FROM favorites where projectID in (select projectID from projects where blockchainID = (select blockchainID from blockchains where blockchainName = ?))", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } 
    });
    db.query("DELETE FROM projects where blockchainID = (select blockchainID from blockchains where blockchainName = ?)", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } 
    });   
    db.query("DELETE FROM blockchains where blockchainName = ?", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } 
    });   
}

// Get All Categories
const getCategories = (result) => {
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
const insertCategory = (data, result) => {
    db.query("INSERT INTO categories SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Update Category
const updateCategory = (data, result) => {
    let cond = [data.categoryName, data.origCategoryName]
    console.log(cond)
    db.query("UPDATE categories SET categoryName = ? where categoryName = ?",cond, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Delete Category
const removeCategory = (data, result) => {
    let cond = [data.categoryName]
    db.query("DELETE FROM favorites where projectID in (select projectID from projects where categoryID = (select categoryID from categories where categoryName = ?))", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } 
    }); 
    db.query("DELETE FROM projects where categoryID = (select categoryID from categories where categoryName = ?)", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } 
    }); 
    db.query("DELETE FROM categories where categoryName = ?", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } 
    });
}

// Get All Users
const getUsers = (result) => {
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
const insertUser = (data, result) => {
    db.query("INSERT INTO users SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Update User
const updateUser = (data, result) => {
    let cond = [data.userName, data.isAdmin, data.origUserName]
    db.query("UPDATE users SET userName = ?, isAdmin = ? where userName = ?",cond, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Delete User
const removeUser = (data, result) => {
    let cond = [data.userName, data.isAdmin]
    db.query("DELETE FROM users where userName = ?", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Get All Favorites
const getFavorites = (result) => {
    db.query("select c.projectName,c.marketCap,x.blockchainName,y.categoryName,c.projectName,c.description,c.inceptionDate from favorites a left join users b on a.userID = b.userID left join projects c on a.projectID = c.projectID left join blockchains x on c.blockchainID = x.blockchainID left join categories y on c.categoryID = y.categoryID;", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Insert Favorite
const insertFavorite = (data,result) => {
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

// Delete Favorite
const removeFavorite = (data, result) => {
    let cond = [data.projectName]
    db.query("DELETE FROM favorites where projectID in(select projectID from projects where projectName = ?)", cond , (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

module.exports = {
    getProjects,insertProject,removeProject,updateProject, getBlockchains, insertBlockchain, updateBlockchain, removeBlockchain, getCategories, insertCategory, updateCategory, removeCategory, getUsers, insertUser, updateUser, removeUser, insertFavorite, getFavorites, removeFavorite  
};