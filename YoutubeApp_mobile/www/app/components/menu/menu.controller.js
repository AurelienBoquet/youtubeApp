angular.module('youtubeApp')
  .controller('MenuCtrl', function($scope, connection, $state) {


    $scope.logout = function() {
      connection.logout().then(function() {
        $state.go('login', {}, { reload: true, location: true });
      })
    }
  });
