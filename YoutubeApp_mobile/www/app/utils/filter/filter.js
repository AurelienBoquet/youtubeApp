angular.module('youtubeApp')
  .filter('secondToTime', function() {
    return function(_seconds) {
      var hours = parseInt( _seconds / 3600 ) % 24;
      var minutes = parseInt( _seconds / 60 ) % 60;
      var seconds = _seconds % 60;

      var hour_str = (hours) ? (hours < 10 ? "0" + hours : hours) + ":" : '';
      var minutes_str = (minutes < 10 ? "0" + minutes : minutes) + ":";

      return hour_str + minutes_str  + (seconds  < 10 ? "0" + seconds : seconds);
    }
});
