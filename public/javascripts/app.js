var app = angular.module('NBA-Visualizer', []);

// controller for the player page
app.controller('playerPageController', function($scope, $http) {
  // call the route to find true shooting scores
  $scope.submitTrueShootingQuery = function () {
    $http({
      url: '/true-shooting-percentage/' + $scope.shootingpercentageInput,
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
