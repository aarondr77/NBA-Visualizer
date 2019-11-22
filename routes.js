var express = require('express');
var router = express.Router();

/* ----- Connects to your mySQL database ----- */

const oracledb = require('oracledb');

var connection = oracledb.getConnection({
    user     : "admin",
    password : "password",
    connectString : "cis450project.ctwsisw9u9yz.us-east-1.rds.amazonaws.com:1521/NBADATA"
});

/* ----- ------------------------------- ----- */


router.get('/', function(req, res) {
    var query = 'SELECT *  FROM Draft'; 
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        res.json(rows);
      }
    });  
  });


module.exports = router;
