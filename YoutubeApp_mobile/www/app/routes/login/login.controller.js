angular.module('youtubeApp')
  .controller('LoginCtrl', function($scope, socket, $state, localStorage, connection) {
    "use strict";

    // init val
    $scope.actif = 'signin';
    $scope.data = {};

    // change view and data
    $scope.changeActif = function(route) {
      $scope.data = {};
      $scope.actif = route;
    };

    $scope.submit = function() {
      if ($scope.data) {
        connection[$scope.actif]($scope.data).then(function() {
          $scope.data = {};
        });
      }
    };

  });
