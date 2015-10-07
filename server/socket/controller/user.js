var _user = require('../functions/_user');

module.exports = function(socket) {
  socket.on('signup', function (data) {
    _user.signUp(socket, data);
  });

  socket.on('signin', function (data) {
    _user.signIn(socket, data);
  });

  socket.on('isLoggedIn', function (data) {
    _user.isLoggedIn(socket, data);
  });

};