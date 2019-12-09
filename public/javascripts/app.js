var app = angular.module('NBA-Visualizer', []);

// controller for the player page
app.controller('playerPageController', function($scope, $http) {
  // call the route to find true shooting scores
  $scope.submitTrueShootingQuery = function () {
    $http({
      url: '/trueShootingPercentage/' + $scope.shootingpercentageInput,
      method: 'GET'
    }).then(function successCallback(response) {
      var data = response.data.rows
      $scope.shootingpercentage = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  },

  // call the route to find the most likely shot location
  $scope.submitlikelyshotQuery = function () {
    $http({
      url: '/likelyshot/' + $scope.inputPlayer + '/' + $scope.inputSeason,
      method: 'GET'
    }).then(function successCallback(response) {
      var data = response.data.rows
      $scope.likelyshot = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  },

  // call the route to find the most likely shot value
  $scope.submitlikelyshotValueQuery = function () {
    $http({
      url: '/likelyshotValue/' + $scope.inputPlayerValue + '/' + $scope.inputSeasonValue,
      method: 'GET'
    }).then(function successCallback(response) {
      var data = response.data.rows
      $scope.likelyshotValue = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  },

  // call the route to find the number of clutch shots taken in season
  $scope.submitClutchQuery = function () {
    $http({
      url: '/clutch/' + $scope.inputPlayerClutch + '/' + $scope.inputSeasonClutch,
      method: 'GET'
    }).then(function successCallback(response) {
      var data = response.data.rows
      $scope.clutchness = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  }
});

// Controller for the team page
app.controller('teamPageController', function($scope, $http) {
  // call the route to find players with higher than average field goal percentage
  $scope.submitTeamQuery = function() {
    console.log($scope.teamName)
    console.log($scope.year)
    $http({
      url: '/fieldGoalPercentage/' + $scope.teamName + '/' + $scope.year,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log('got fgp results>>>', response.data.rows)
      var data = response.data.rows.map(x => [x[0], x[1], x[2], x[3].toFixed(3), x[4].toFixed(3)]);
      $scope.player_fg = data;
    }, function errorCallback(response) {
      console.log("Team ERROR: ", response);
    });
  }

  $scope.submitTwoPointQuery = function() {
    $http({
      url: '/twoPointPercentage/' + $scope.yearRookie,
      method: 'GET'
    }).then(function callBack(response) {
      var data = response.data.rows;
      console.log('data >>', data)
      $scope.rookieTeam = data;
    }, function errCallback(response) {
      console.log("2 point err ", response);
    });
  }
});


app.controller('shotPageController', function($scope, $http) {
  $scope.submitShotQuery = function() {
    $http({
      url: '/getShots/' + $scope.playerName + '/' + $scope.year,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log("success")
      console.log("Shots: ", response.data);
      var data = response.data.rows;
      var processsed_data = []
      //add the correct image source
      for (var i = 0; i < data.length; i++) {
        var img_source = "/assets/circle.png";
        if (data[i][4] == 0) {
          img_source = "/assets/x.png"
        }
        var top = (data[i][2] / 455) * 330 - 5 + "";
        var left = ((507 - data[i][3]) / (507 * 2)) * 588 - 5 + "";
        console.log("top: " + top);
        console.log("left: " + left);
        processsed_data.push([data[i][0],data[i][1], top + "px", left + "px", img_source]);
      }

      $scope.shots = processsed_data;
    }, function errorCallback(response) {
      console.log("Shots ERROR: ", response);
    });
  }
});