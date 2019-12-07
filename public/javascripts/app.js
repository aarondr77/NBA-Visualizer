var app = angular.module('NBA-Visualizer', []);

app.controller('teamController', function($scope, $http) {
  $scope.submitTeamQuery = function() {
    console.log("BINDING")
    $http({
      url: '/team/' + $scope.teamName,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log("success")
      console.log("Team: ", response.data);
      var data = response.data.rows
      $scope.team = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  },

  $scope.submitTrueShootingQuery = function () {
    console.log("HERE")
    console.log($scope.shootingpercentageInput)
    $http({
      url: '/true-shooting-percentage/' + $scope.shootingpercentageInput,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log("success")
      console.log("Team: ", response.data);
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
      console.log("success")
      console.log("Team: ", response.data);
      var data = response.data.rows
      $scope.likelyshot = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  }, 

  $scope.submitlikelyshotValueQuery = function () {
    console.log($scope.inputPlayerValue)
    console.log($scope.inputSeasonValue)
    $http({
      url: '/likelyshotValue/' + $scope.inputPlayerValue + '/' + $scope.inputSeasonValue,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log("success")
      console.log("Team: ", response.data);
      var data = response.data.rows
      $scope.likelyshotValue = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  } 
});


app.controller('teamPageController', function($scope, $http) {
  $scope.submitTeamQuery = function() {
    console.log("BINDING")
    $http({
      url: '/fieldGoalPercentage/' + $scope.teamName + '/' + $scope.year,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log("success")
      console.log("Team: ", response.data);
      var data = response.data.rows
      $scope.team = data
    }, function errorCallback(response) {
      console.log("Team ERROR: ", response);
    });
  }
});

