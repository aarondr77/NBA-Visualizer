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
      url: '/team/' + $scope.team,
      method: 'GET'
    }).then(function successCallback(response) {
      console.log("success")
      console.log("Team: ", response.data);
      $scope.team = response.data;
    }), function errorCallback(response) {
      console.log("Team ERROR: ", response);
    }
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
