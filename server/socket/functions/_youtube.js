var db = require('../../config/db');

exports.sendVideo = function(socket, id) {
  socket.broadcast.to(socket._room).emit('launchVideo', id);
};

exports.playVideo = function(socket) {
  socket.broadcast.to(socket._room).emit('playVideo');
};

exports.pauseVideo = function(socket) {
  socket.broadcast.to(socket._room).emit('pauseVideo');
};

exports.stopVideo = function(socket) {
  socket.broadcast.to(socket._room).emit('stopVideo');
};

exports.muteVideo = function(socket) {
  socket.broadcast.to(socket._room).emit('muteVideo');
};

exports.unMuteVideo = function(socket) {
  socket.broadcast.to(socket._room).emit('unMuteVideo');
};

exports.setVolume = function(socket, volume) {
  socket.broadcast.to(socket._room).emit('setVolume', volume);
};

exports.setDuration = function(socket, duration) {
  socket.broadcast.to(socket._room).emit('setDuration', duration);
};


// desktop to mobile
/*exports.sendState = function(socket, state) {
  socket.broadcast.to(socket._room).emit('sendState', state);
};*/

exports.closeVideo = function(socket) {
  socket.broadcast.to(socket._room).emit('closeVideo');
};