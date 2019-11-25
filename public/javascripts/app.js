var app = angular.module('NBA-Visualizer', []);

app.controller('teamController', function($scope, $http) {
  $scope.submitTeamQuery = function() {
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
