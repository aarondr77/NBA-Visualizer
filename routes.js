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
    console.log("update")

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


router.get('/team', function(req, res) {
  console.log("printing team page")
  // res.render('views/homepage.html')
  res.sendFile(path.join(__dirname, 'views', 'team.html'));
});

/* ----- ------------------------------- ----- */


router.get('/test', function(req, res) {
  query_db("SELECT * FROM Draft", function(data, err) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(data)
    }
  });
});

router.get('/team/:inputTeam/:inputYear', function(req, res) {
  var inputTeam = req.params.inputTeam;
  var inputYear = req.params.inputYear;
  var query = "SELECT team.tm as team, seasonstats.player as player_name, team.year as season_year, seasonstats.fg_percent as player_fg_percent, team.fg_percent as team_fg_percent FROM seasonstats INNER JOIN team ON team.tm = seasonstats.tm AND seasonstats.year = team.year WHERE seasonstats.fg_percent > team.fg_percent and team.year = " + inputYear +" and team.tm = '" + inputTeam + "'"; 
  console.log(query); 
  query_db(query, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("here")
      console.log(data)
      res.json(data)
    }
  });
});

router.get('/likelyshot/:inputPlayer/:inputYear', function (req, res) {
  var inputPlayer = req.params.inputPlayer
  var inputYear = req.params.inputYear
  console.log("input player: " + inputPlayer)
  console.log("input year: " + inputYear)
  var query = `
    SELECT player, season, AVG(shot_distance_ft) as most_likely_distance
    FROM shots
    WHERE player = '` + inputPlayer + `' AND season = ` + inputYear + ` AND outcome = 1
    GROUP BY player, season`; 
  query_db(query, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("here")
      console.log(data)
      res.json(data)
    }
  });
})


router.get('/true-shooting-percentage/:inputPlayer', function(req, res) {
  var inputPlayer = req.params.inputPlayer;
  console.log("input Player")
  console.log(inputPlayer)
  var query = `
    SELECT player_name, season_year as rookie_year, ts_percent
    FROM
    (SELECT draft.player as player_name, draft.year as draft_year, seasonstats.year as season_year, seasonstats.ts_percent as ts_percent
    FROM draft
    INNER JOIN seasonstats ON draft.id = seasonstats.id)
    WHERE draft_year + 1 = season_year and player_name = '` + inputPlayer +`'`; 
  query_db(query, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("here")
      console.log(data)
      res.json(data)
    }
  });
});


module.exports = router;
