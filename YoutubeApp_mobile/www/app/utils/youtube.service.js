angular.module('youtubeApp').
   factory('youtube', function($rootScope, socket) {

    var busy = false;

    // service functions
    return {

      videoSearchByKeyWord: function(input, callback) {

        if (busy) { return false; }

        busy = true;

        socket.emit('videoSearchByKeyWord', input);

        socket.on('videoSearchByKeyWord', function(response) {
          busy = false;

          if (callback && typeof callback === 'function') {
            callback(response.items[0]);
          } else {
            if (response.items.length) {
              response.q = input;
              $rootScope.$emit('videoResult', response);
            } else {
              $rootScope.$emit('videoResult');
            }
          }
        });
      },

      videoGetNextPage: function(q, token, callback) {

        if (busy) { return false; }

        busy = true;

        socket.emit('videoGetNextPage', {
          input: q,
          token: token
        });

        socket.on('videoGetNextPage', function(response) {
          busy = false;

          if (callback && typeof callback === 'function') {
            callback(response);
          } else {
            $rootScope.$emit('onVideoNextPage', response);
          }
        });
      },

      videoGetData: function(id, callback) {

        if (busy) { return false; }

        busy = true;

        socket.emit('videoGetData', id);

        socket.on('videoGetData', function(response) {
          busy = false;

          if (response && (response||{}).items) {
            if (callback && typeof callback === 'function') {
              callback(response.items[0]);
            } else {
              $rootScope.$emit('onVideoData', response.items[0]);
            }
          }
        });
      },

      convertVideoDuration: function(duration) {
        var a = duration.match(/\d+/g);

        if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
          a = [0, a[0], 0];
        }

        if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
          a = [a[0], 0, a[1]];
        }

        if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
          a = [a[0], 0, 0];
        }

        duration = 0;

        if (a.length == 3) {
          duration = duration + parseInt(a[0]) * 3600;
          duration = duration + parseInt(a[1]) * 60;
          duration = duration + parseInt(a[2]);
        }

        if (a.length == 2) {
          duration = duration + parseInt(a[0]) * 60;
          duration = duration + parseInt(a[1]);
        }

        if (a.length == 1) {
          duration = duration + parseInt(a[0]);
        }

        return duration
      }
    }
  });
