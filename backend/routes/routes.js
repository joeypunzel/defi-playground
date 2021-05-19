
//module.exports = app => {
//const queries = require("../controllers/controllers.js");
//}

const db = require("../config/database.js");
const express = require('express');
const router = express.Router();
const funcs = require("../controllers/controllers.js")


 
// Get All Project
router.get('/projectList',funcs.showProjects);
// get user lists


//router.get('/projectList', function(req, res) {
//    let sql = `select p.projectID,p.projectName,p.marketCap, b.blockchainName,c.categoryName, p.description,p.inceptionDate from projects p left join blockchains b on p.blockchainID = b.blockchainID left join categories c on p.categoryID = c.categoryID;`;
//   db.query(sql, function(err, data, fields) {
//        if (err) throw err;
//        res.json({
//            data
//        })
//      })  
//  });


// Create New Project
//app.post('/projectList', queries.createProject);

// Get All Blockchains
//app.get('/blockchainList', queries.showBlockchains);

// Create New Blockchain
//app.post('/blockchainList', queries.createBlockchain);

// Get All Categories
//app.get('/categoryList', queries.showCategories);

// Create New Blockchain
//app.post('/categoryList', queries.createCategory);

// Get All Users
//app.get('/userList', queries.showUsers);

// Create New User
//app.post('/userList', queries.createUser);

// Get All Favorites
//app.get('/favoriteList', queries.showFavorites);

// Create New Favorite
//app.post('/favoriteList', queries.createFavorite);

module.exports = router;