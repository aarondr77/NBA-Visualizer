var express = require('express');
var router = express.Router();
var path = require('path');

/* ----- Connects to your mySQL database ----- */

const oracledb = require('oracledb');

var connection = oracledb.getConnection({
    user     : "admin",
    password : "password",
    connectString : "cis450project.ctwsisw9u9yz.us-east-1.rds.amazonaws.com:1521/NBADATA"
});

function query_db(query, callback) {
  try {
    console.log("Trying to connect")

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
      console.log("Error connecting to database: " + err)
  }
}

/* ----- ------------------------------- ----- */

router.get('/', function(req, res) {
  console.log("printing homepage")
  // res.render('views/homepage.html')
  res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});

/* ----- ------------------------------- ----- */


router.get('/test', function(req, res) {
  query_db("SELECT * FROM Draft", function(data, err) {
    if (err) {
      res.render("homepage.html")
      console.log(err)
    }
    else {
      res.json(data)
    }
  });
});

router.get('/team/:inputTeam', function(req, res) {
  var inputTeam = req.params.inputTeam;
  query_db("SELECT t.TM as Team, t.Year as Year FROM Team t" + "WHERE t.TM=\'"+inputTeam+"\'", function(data, err) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(data)
    }
  });
});




module.exports = router;
