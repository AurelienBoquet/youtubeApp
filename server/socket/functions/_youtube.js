var db = require('../../config/db');
var config = require('../../config/config');
var google = require("googleapis");
var youtube = google.youtube('v3');

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
exports.closeVideo = function(socket) {
  socket.broadcast.to(socket._room).emit('closeVideo');
};


// youtube request

exports.videoSearchByKeyWord = function(socket, input) {
  var params = {
    q: input,
    part: 'snippet',
    maxResults: 8,
    type: 'video',
    auth: config.youtube.apiKey
  };

  youtube.search.list(params, function(err, response) {
    if (err) { console.log(err) }

    if (response) {
      console.log('videoSearchByKeyWord', response);
      socket.emit('videoSearchByKeyWord', response);
    }
  });
};

exports.videoGetNextPage = function(socket, input, token) {
  var params = {
    q: input,
    part: 'snippet',
    type: 'video',
    maxResults: 6,
    pageToken: token,
    auth: config.youtube.apiKey
  };

  youtube.search.list(params, function(err, response) {
    if (err) { console.log(err) }

    if (response) {
      console.log('videoGetNextPage', response);
      socket.emit('videoGetNextPage', response);
    }
  });
};

exports.videoGetData = function(socket, id) {
  var params = {
    id: id,
    part: 'contentDetails',
    auth: config.youtube.apiKey
  };

  youtube.videos.list(params, function(err, response) {
    if (err) { console.log(err) }

    if (response) {
      console.log('videoGetData', response);
      socket.emit('videoGetData', response);
    }
  });
};

