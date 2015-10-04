angular.module('youtubeApp')
  .factory('localStorage', function ($window) {
    var defaultKey = 'youtubeApp';

    return {

      get: function (key) {
        var k = (key) ? key : defaultKey;

        return $window.localStorage.getItem(k);
      },

      set: function (data, key) {
        var k = (key) ? key : defaultKey;

        if (typeof data === 'string') {
          $window.localStorage.setItem(k, data);
        }
      },

      remove: function(key) {
        var k = (key) ? key : defaultKey;

        $window.localStorage.removeItem(k);
      }

    };
  });
