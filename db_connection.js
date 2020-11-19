/**DB Connection */
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database:"mydb"
});
module.exports= con;
/**DB Connection */