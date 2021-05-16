import mysql from "mysql";
  
// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'cs340_punzelj',
  password: '8436',
  database: 'cs340_punzelj'
});
 
export default db;
