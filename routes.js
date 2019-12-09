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
          console.log("error")
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
  res.sendFile(path.join(__dirname, 'views', 'player.html'));
});

router.get('/shotChart', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'shot_chart.html'));
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

router.get('/fieldGoalPercentage/:inputTeam/:inputYear', function(req, res) {
  var inputTeam = req.params.inputTeam;
  var inputYear = req.params.inputYear;
  console.log(inputTeam)
  console.log(inputYear)
  var query = `
    SELECT team.tm as team,
           seasonstats.player as player_name,
           team.year as season_year,
           seasonstats.fg_percent as player_fg_percent,
           team.fg_percent as team_fg_percent
    FROM seasonstats
    INNER JOIN team ON team.tm = seasonstats.tm AND seasonstats.year = team.year
    WHERE seasonstats.fg_percent > team.fg_percent
    and team.year = '` + inputYear + `' and team.tm = '` + inputTeam + `'`;
  query_db(query, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('field goal results: ', data)
      res.json(data)
    }
  });
});

router.get('/twoPointPercentage/:inputYear', function(req, res) {
  var inputYear = req.params.inputYear;
  console.log(inputYear)
  var query = `
    SELECT DISTINCT team1.tm as team_name, team1.year as year, t1.player as rookie
    FROM (SELECT draft.year, draft.player, seasonstats1.tm, seasonstats1.two_p_percent
          FROM draft
          INNER JOIN (SELECT player, year, two_p_percent, tm
                      FROM seasonstats) seasonstats1
          ON draft.player = seasonstats1.player and seasonstats1.year = (draft.year + 1)) t1
    INNER JOIN (SELECT year, two_p_percent, tm
                FROM team) team1
    ON team1.year = t1.year and team1.tm = t1.tm
    WHERE team1.two_p_percent < t1.two_p_percent and team1.year = ` + inputYear;
  query_db(query, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('two per results: ', data)
      res.json(data)
    }
  });
});

router.get('/likelyshot/:inputPlayer/:inputYear', function (req, res) {
  var inputPlayer = req.params.inputPlayer
  var inputYear = req.params.inputYear
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
      res.json(data)
    }
  });
})

router.get('/likelyshotValue/:inputPlayer/:inputYear', function (req, res) {
  var inputPlayer = req.params.inputPlayer
  var inputYear = req.params.inputYear
  var query = `
    SELECT *
    FROM (SELECT player, season, shot_value AS most_likely_shot_value
      FROM shots
      WHERE player = '` + inputPlayer + `' AND season = ` + inputYear  + ` GROUP BY player, season, shot_value
      ORDER BY COUNT(*) DESC) t1
    WHERE ROWNUM < 2`;
  query_db(query, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(data)
    }
  });
})

router.get('/clutch/:inputPlayer/:inputYear', function (req, res) {
  var inputPlayer = req.params.inputPlayer
  var inputYear = req.params.inputYear
  var query = `
    WITH seconds_table as (SELECT player, (to_number(SUBSTR(game_clock, 1, instr(game_clock, ':')-1)) * 60 + to_number(SUBSTR(game_clock, instr(game_clock, ':')+1, instr(game_clock, ':')+3))) as seconds_left, game_clock, season
    FROM shots
    WHERE player = '` + inputPlayer + `' and quarter = 4)
    SELECT player, count(*) as clutch_shot_num, season
    FROM seconds_table
    WHERE player = '` + inputPlayer + `' and season = '` + inputYear + `' and seconds_left < 5
    GROUP BY player, season`;
  query_db(query, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(data)
    }
  });
})


router.get('/true-shooting-percentage/:inputPlayer', function(req, res) {
  var inputPlayer = req.params.inputPlayer;
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
      res.json(data)
    }
  });
});

router.get('/getShots/:playerName/:year', function(req, res) {
  var query = `
  SELECT PLAYER, SEASON, TOP_PX_LOCATION, LEFT_PX_LOCATION, OUTCOME
  FROM shots
  WHERE SEASON = '` + req.params.year + `' AND PLAYER = '` + req.params.playerName + `'
  `;
  query_db(query, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(data)
      res.json(data)
    }
  });

});

module.exports = router;
