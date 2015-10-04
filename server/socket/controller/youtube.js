var _yt = require('../functions/_youtube');

module.exports = function(socket) {

  // from mobile to desktop
  socket.on('sendVideo', function(id) {
    console.log('sendVideo');
    _yt.sendVideo(socket, id);
  });
  socket.on('playVideo', function() {
    console.log('playVideo');
    _yt.playVideo(socket);
  });
  socket.on('pauseVideo', function() {
    console.log('pauseVideo');
    _yt.pauseVideo(socket);
  });
  socket.on('stopVideo', function() {
    console.log('stopVideo');
    _yt.stopVideo(socket);
  });
  socket.on('muteVideo', function() {
    console.log('muteVideo');
    _yt.muteVideo(socket);
  });
  socket.on('unMuteVideo', function() {
    console.log('unMuteVideo');
    _yt.unMuteVideo(socket);
  });
  socket.on('setVolume', function(volume) {
    console.log('setVolume');
    _yt.setVolume(socket, volume);
  });


  // from desktop to mobile
/*  socket.on('sendState', function(state) {
    _yt.sendState(socket, state)
  });*/

  socket.on('closeVideo', function() {
    _yt.closeVideo(socket);
  })

};