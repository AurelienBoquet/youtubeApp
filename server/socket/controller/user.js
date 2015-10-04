var _user = require('../functions/_user');

module.exports = function(socket) {
  socket.on('signup', function (data) {
    console.log('in signup');
    _user.signUp(socket, data);
  });

  socket.on('signin', function (data) {
    console.log('in signin');
    _user.signIn(socket, data);
  });

  socket.on('isLoggedIn', function (data) {
    console.log('in isLoggedIn');
    _user.isLoggedIn(socket, data);
  });

};