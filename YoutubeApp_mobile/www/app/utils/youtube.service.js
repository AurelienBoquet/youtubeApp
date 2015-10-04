angular.module('youtubeApp').
   factory('youtube', function($rootScope) {
    "use strict";

    var API_KEY = 'AIzaSyBnwIvi6hP4x1Q1GLiaxDHZfnxK6ULTrcY';
    var OAUTH2_CLIENT_ID = '1026998819218-jpg7ntg4lofrtl3jr1crlqrirvtg3ihp.apps.googleusercontent.com';
    var OAUTH2_SCOPES = ['https://www.googleapis.com/auth/youtube'];
    var busy = false;

    function checkAuth() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
      }, handleAuthResult);
    }

    // Handle the result of a gapi.auth.authorize() call.
    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        // Authorization was successful. Hide authorization prompts and show
        // content that should be visible after authorization succeeds.
        // load google youtube api
        gapi.client.load('youtube', 'v3');
        $rootScope.$emit('googleApiLoaded');
      } else {
        $rootScope.$emit('googleApiNotLoaded');
      }
    }

    function searchVideo(options, callback) {

      if (busy) { return false; }

      busy = true;

      var request = gapi.client.youtube.search.list(options);

      request.execute(function(response) {
        if (response && (response||{}).result) {
          if (callback && typeof callback === 'function') {
            callback(response);
          }
        }
        busy = false;
      });
    }

    // service functions
    return {

      loadApiOnClick: function() {
        gapi.auth.authorize({
          client_id: OAUTH2_CLIENT_ID,
          scope: OAUTH2_SCOPES,
          immediate: false
        }, handleAuthResult);
      },

      loadApi: function() {
        gapi.auth.init(function() {
          gapi.client.setApiKey(API_KEY);
          window.setTimeout(checkAuth, 1);
        });
      },

      videoSearchByKeyWord: function(input, callback) {

       searchVideo({
         q: input,
         part: 'snippet',
         maxResults: 8,
         type: 'video'
       }, function(response) {
         if (callback && typeof callback === 'function') {
           callback(response.items[0]);
         } else {
           if (response.result.items.length) {
             response.result.q = input;
             $rootScope.$emit('videoResult', response.result);
           } else {
             $rootScope.$emit('videoResult');
           }
         }
       });
      },

      videoGetNextPage: function(q, token, callback) {

        searchVideo({
          q: q,
          part: 'snippet',
          type: 'video',
          maxResults: 6,
          pageToken: token
        }, function(response) {
          if (callback && typeof callback === 'function') {
            callback(response);
          } else {
            $rootScope.$emit('onVideoNextPage', response);
          }
        });
      },

      videoGetData: function(id, callback) {
        var request = gapi.client.youtube.videos.list({
          id: id,
          part: 'contentDetails'
        });

        request.execute(function(response) {
          if (response && (response||{}).result) {
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
