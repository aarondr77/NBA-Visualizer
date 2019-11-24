var express = require('express');
var router = express.Router();

/* ----- Connects to your mySQL database ----- */

const oracledb = require('oracledb');

var connection = oracledb.getConnection({
    user     : "admin",
    password : "password",
    connectString : "cis450project.ctwsisw9u9yz.us-east-1.rds.amazonaws.com:1521/NBADATA"
});

function send_query(query, callback) {
  try {
    console.log("Attempting connection")

    oracledb.getConnection({
        user          : 'admin',
        password      : 'password',
        connectString : "cis450project.ctwsisw9u9yz.us-east-1.rds.amazonaws.com:1521/NBADATA"
      }, function(err, connection) {
        if (err) {
          console.error(err);
          return;
        }
        connection.execute(query, callback);

    });
  } catch (err) {
      console.log("Error connecting to database")
      console.log(err);
  }
}

/* ----- ------------------------------- ----- */


router.get('/', function(req, res) {
  send_query("SELECT * FROM Draft", function(data, err) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(data)
    }
  });
  });


module.exports = router;
