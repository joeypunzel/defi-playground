// import express
const express = require("express");
// import cors
const cors = require("cors");
// import routes
const Router = require('./routes/routes.js');
 
// init express
const app = express();
 
// use express json
app.use(express.json());
 
// use cors
app.use(cors());

// simple route
//app.get("/", (req, res) => {
//  res.json({ message: "Welcome to backend defi-playground node application." });
//});


// use router
app.use(Router);
 
app.listen(5000, () => console.log('Server running at http://localhost:5000'));