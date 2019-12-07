var app = angular.module('NBA-Visualizer', []);

app.controller('teamController', function($scope, $http) {
  $scope.submitTeamQuery = function() {
    $http({
      url: '/team/' + $scope.teamName,
      method: 'GET'
    }).then(function successCallback(response) {
      var data = response.data.rows
      $scope.team = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  },

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

  $scope.submitlikelyshotQuery = function () {
    $http({
      url: '/likelyshot/' + $scope.inputPlayerValue + '/' + $scope.inputSeasonValue,
      method: 'GET'
    }).then(function successCallback(response) {
      var data = response.data.rows
      $scope.likelyshot = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  }, 

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


app.controller('teamPageController', function($scope, $http) {
  $scope.submitTeamQuery = function() {
    $http({
      url: '/fieldGoalPercentage/' + $scope.teamName + '/' + $scope.year,
      method: 'GET'
    }).then(function successCallback(response) {
      var data = response.data.rows
      $scope.high_fg_results = data
    }, function errorCallback(response) {
      console.log("Team ERROR: ", response);
    });
  }
});

