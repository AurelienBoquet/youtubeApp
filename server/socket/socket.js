var ioCtrl = require('./functions/_youtube');

module.exports = function(io) {
  io.on('connection', function(socket) {

    var _socket = socket;

    socket.on('joinRoom', function(room) {
      _socket.join(room);
      _socket._room = room;
    });

    socket.on('logoutDesktop', function () {
      socket.leave(_socket._room);
      _socket._room = false;
    });

    socket.on('logoutMobile', function () {
      socket.broadcast.to(socket._room).emit('logoutMobile');
      socket.leave(_socket._room);
      _socket._room = false;
    });

    // require all socket controllers
    require('./controller/user')(_socket);
    require('./controller/youtube')(_socket);
  })
};





