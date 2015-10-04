angular.module('youtubeApp')
  .controller('HomeCtrl', function($scope, $rootScope, $ionicScrollDelegate, socket, video, $interval, youtube) {
    "use strict";

    // graphical bug
    $scope.isApiLoaded = true;

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

    /*function createTimer() {
      timer = $interval(function() {
        $scope.duration++;
      }, 1000)
    }

    function deleteTimer() {
      if (timer) {
        $interval.cancel(timer);
      }
    }*/

    $scope.searchVideo = function() {
      if ($scope.form.search && $scope.isApiLoaded) {
        youtube.videoSearchByKeyWord($scope.form.search);
      }
    };

    $scope.chooseVideo = function(data) {
      reset();

      video.choose(data, function() {
        $scope.footerIsOpen = true;
        //createTimer();
      });
    };

    socket.on('closeVideo', function() {
      reset();
    });

    /*$rootScope.$on('videoNowPlay', function() {
      if (timer) {
        createTimer();
      }
    });

    $rootScope.$on('videoNowPause', function() {
      deleteTimer();
    });*/

    // video actions
    $scope.setVolume = function() {
      video.setVolume($scope.volume);
    };

    /*$scope.setDuration = function() {
      video.setDuration($scope.duration);
    };*/

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


    // load api
    $scope.loadApi = function() {
      youtube.loadApiOnClick();
    };

    $rootScope.$on('googleApiNotLoaded', function() {
      $scope.isApiLoaded = false;

      var phase = $scope.$root.$$phase;
      if (phase !== '$apply' && phase !== '$digest') {
        $scope.$apply();
      }
    });

    $rootScope.$on('googleApiLoaded', function() {
      $scope.isApiLoaded = true;

      var phase = $scope.$root.$$phase;
      if (phase !== '$apply' && phase !== '$digest') {
        $scope.$apply();
      }
    });


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

        // needed to change data in ng-repeat
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

    /*$scope.$on("$destroy", function() {
      deleteTimer();
    });*/
  });
