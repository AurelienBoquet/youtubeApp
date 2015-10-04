var express = require('express'),
    config = require('./config/config'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

// Middleware
require('./config/express')(app);

// sockets
require('./socket/socket')(io);


server.listen(config.port, function () {
    console.log('Express server listening on %d', config.port);
});








