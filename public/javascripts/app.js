var app = angular.module('NBA-Visualizer', []);
/*
app.controller('teamController', function($scope, $http) {
  $scope.submitTeamQuery = function() {
    console.log("BINDING")
    $http({
      url: '/team/' + $scope.team,
      method: 'GET'
    }).then(res => {
      console.log("Team: ", res.data);
      $scope.team = res.data;
    }, err => {
      console.log("Team ERROR: ", err);
    });
  }
});
*/
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
      url: '/likelyshot/' + $scope.inputPlayer + '/' + $scope.inputSeason,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log("success")
      console.log("Team: ", response.data);
      var data = response.data.rows
      $scope.likelyshot = data
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
  }
});


app.controller('teamPageController', function($scope, $http) {
  $scope.submitTeamQuery = function() {
    console.log("BINDING")
    $http({
      url: '/team/' + $scope.teamName + '/' + $scope.year,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log("success")
      console.log("Team: ", response.data);
      var data = response.data.rows
      $scope.high_fg_results = data
    }, function errorCallback(response) {
      console.log("Team ERROR: ", response);
    });
  }
});

// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
