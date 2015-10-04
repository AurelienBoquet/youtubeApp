angular.module('youtubeApp')
  .controller('HeaderCtrl', function($scope, $timeout, youtube) {

    var timer;
    $scope.researchBar = false;

    $scope.activateResearchBar = function() {
      $scope.researchBar = !$scope.researchBar;
      $scope.research = '';
    };

    $scope.searchVideo = function() {
      if ($scope.research.length > 2) {
        if (timer) {
          $timeout.cancel(timer);
        }

        timer = $timeout(function() {
          youtube.videoSearchByKeyWord($scope.research);
        }, 1000);
      }
    };

    $scope.$on("$destroy", function() {
      if (timeout) {
        $timeout.cancel(timer);
      }
    });

  });
