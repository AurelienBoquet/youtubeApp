angular.module('youtubeApp')
  .controller('HomeCtrl', function($scope, $rootScope, $ionicScrollDelegate, socket, video, $interval, youtube) {

    var timer;
    $scope.hasResearched = false;
    $scope.videoList = {};
    $scope.form = {};
    reset();

    function reset() {
      timer = null;
      $scope.noVideoFound = false;
      $scope.footerIsOpen = false;
      $scope.hasMoreVideo = false;
      $scope.videoStats = {};
      $scope.playPauseClass = 'ion-pause';
      $scope.muteUnMuteClass = 'ion-volume-mute';
      $scope.volume = 50;
      $scope.duration = 0;
    }

    $scope.searchVideo = function() {
      if ($scope.form.search) {
        youtube.videoSearchByKeyWord($scope.form.search);
      }
    };

    $scope.chooseVideo = function(data) {
      reset();

      video.choose(data, function() {
        $scope.footerIsOpen = true;
      });
    };

    socket.on('closeVideo', function() {
      reset();
    });

    // video actions
    $scope.setVolume = function() {
      video.setVolume($scope.volume);
    };

    $scope.playPauseVideo = function() {
      if (video.isPlay) {
        $scope.playPauseClass = 'ion-play';
        video.pause();
      } else {
        $scope.playPauseClass = 'ion-pause';
        video.play();
      }
    };

    $scope.stopVideo = function() {
      $scope.playPauseClass = 'ion-play';
      video.stop();
    };

    $scope.muteUnMuteVideo = function() {
      if (video.isMute) {
        $scope.muteUnMuteClass = 'ion-volume-mute';
        video.unMute();
      } else {
        $scope.muteUnMuteClass = 'ion-volume-medium';
        video.mute();
      }
    };

    // show researched video
    $rootScope.$on('videoResult', function(event, result) {

      $scope.hasResearched = true;
      $scope.form = {};

      if (result) {
        $scope.videoList = result;

        $scope.hasMoreVideo = (result.nextPageToken) ? true : false;
        $scope.noVideoFound = false;

        // put user at the top of his research
        $ionicScrollDelegate.scrollTop();

      } else {
        $scope.noVideoFound = true;
        $scope.hasResearched = false;
        $scope.videoList = {};
      }

      var phase = $scope.$root.$$phase;
      if (phase !== '$apply' && phase !== '$digest') {
        $scope.$apply();
      }
    });

    $scope.loadMoreVideo = function() {
      if ($scope.videoList.nextPageToken) {
        youtube.videoGetNextPage($scope.videoList.q, $scope.videoList.nextPageToken,
          function(result) {

            $scope.hasMoreVideo = (result.nextPageToken) ? true : false;

            if (result.items.length) {
              if (result.nextPageToken) {
                $scope.videoList.nextPageToken = result.nextPageToken;
              }

              result.items.forEach(function(item) {
                $scope.videoList.items.push(item);
              });

              $scope.$broadcast('scroll.infiniteScrollComplete');

              var phase = $scope.$root.$$phase;
              if (phase !== '$apply' && phase !== '$digest') {
                $scope.$apply();
              }
            }
          }
        );
      }
    };

    $scope.openFooter = function() {
      $scope.footerIsOpen = !$scope.footerIsOpen;
    };

    $rootScope.$on('videoDataChanged', function(event, video) {

      $scope.videoStats = video;

      var phase = $scope.$root.$$phase;
      if (phase !== '$apply' && phase !== '$digest') {
        $scope.$apply();
      }
    });

  });
