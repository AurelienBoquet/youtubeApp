var _yt = require('../functions/_youtube');

module.exports = function(socket) {

  // from mobile to desktop
  socket.on('sendVideo', function(id) {
    _yt.sendVideo(socket, id);
  });
  socket.on('playVideo', function() {
    _yt.playVideo(socket);
  });
  socket.on('pauseVideo', function() {
    _yt.pauseVideo(socket);
  });
  socket.on('stopVideo', function() {
    _yt.stopVideo(socket);
  });
  socket.on('muteVideo', function() {
    _yt.muteVideo(socket);
  });
  socket.on('unMuteVideo', function() {
    _yt.unMuteVideo(socket);
  });
  socket.on('setVolume', function(volume) {
    _yt.setVolume(socket, volume);
  });


  // from desktop to mobile
  socket.on('closeVideo', function() {
    _yt.closeVideo(socket);
  });


  // youtube Request
  socket.on('videoSearchByKeyWord', function(input) {
    _yt.videoSearchByKeyWord(socket, input);
  });

  socket.on('videoGetNextPage', function(data) {
    _yt.videoGetNextPage(socket, data.input, data.token);
  });

  socket.on('videoGetNextPage', function(id) {
    _yt.videoGetData(socket, id);
  });

};