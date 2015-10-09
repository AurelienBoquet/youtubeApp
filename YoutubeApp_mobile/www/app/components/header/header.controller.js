angular.module('youtubeApp')
  .controller('HeaderCtrl', function($scope, $timeout, youtube) {

    var timer;
    $scope.form = {};
    $scope.researchBar = false;

    $scope.activateResearchBar = function() {
      $scope.researchBar = !$scope.researchBar;
      $scope.form = {};
    };

    $scope.searchVideo = function() {
      if ($scope.form.research.length > 2) {
        if (timer) {
          $timeout.cancel(timer);
        }

        timer = $timeout(function() {
          youtube.videoSearchByKeyWord($scope.form.research);
        }, 1000);
      }
    };

    $scope.$on("$destroy", function() {
      if (timeout) {
        $timeout.cancel(timer);
      }
    });

  });
