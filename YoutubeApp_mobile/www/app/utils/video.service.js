angular.module('youtubeApp').
  service('video', function(socket, $timeout, youtube, $rootScope) {

  var _timerVolume;
  var _timerDuration;
  var _state = -1;
  var _video = {};
  var self = this;

  this.isMute = false;
  this.isPlay = false;

  this.setVideo = function(data) {
    for (var prop in data) {
      if(data.hasOwnProperty(prop)) {
        _video[prop] = data[prop]
      }
    }
    $rootScope.$emit('videoDataChanged', _video);
  };


  // send video
  this.choose = function(data, callback) {
    if (data.id.videoId) {
      socket.emit('sendVideo', data.id.videoId);
    }

    //socket.on('videoIsLoaded', function() {
      if (callback && typeof callback === 'function') {
        callback();
      }

      youtube.videoGetData(data.id.videoId, function(dataVideo) {
        var videoStats = {
          title: data.snippet.title,
          description: data.snippet.description,
          image: data.snippet.thumbnails.medium.url,
          duration: youtube.convertVideoDuration(dataVideo.contentDetails.duration),
          publishedAt: data.snippet.publishedAt,
          channelTitle: data.snippet.channelTitle,
          channelId: data.snippet.channelId,
        };

        self.setVideo(videoStats);
      });
    //});
  };


  // receive data
  socket.on('sendState', function(state) {
    if (_state !== state) {
      if (state === 0 || state === 2 || state === 3) {
        $rootScope.$emit('videoNowPause');
      } else {
        $rootScope.$emit('videoNowPlay');
      }
    }
  });




  // player actions
  this.play = function() {
    self.isPlay = true;
    socket.emit('playVideo');
  };

  this.pause = function() {
    self.isPlay = false;
    socket.emit('pauseVideo');
  };

  this.stop = function() {
    self.isPlay = false;
    socket.emit('stopVideo');
  };

  this.mute = function() {
    self.isMute = true;
    socket.emit('muteVideo');
  };

  this.unMute = function() {
    self.isMute = false;
    socket.emit('unMuteVideo');
  };

  this.setVolume = function(volume) {
    if (_timerVolume) {
      $timeout.cancel(_timerVolume);
    }

    _timerVolume = $timeout(function() {
      socket.emit('setVolume', volume);
    }, 550);

  };

  this.setDuration = function(duration) {
    if (_timerDuration) {
      $timeout.cancel(_timerDuration);
    }

    _timerDuration = $timeout(function() {
      socket.emit('setDuration', duration);
    }, 550);

  };
});
