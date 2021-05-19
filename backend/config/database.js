const mysql  = require("mysql");
  
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'cs340_punzelj',
  password: '8436',
  database: 'cs340_punzelj'
});
 
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;