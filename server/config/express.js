'use strict';

var config = require('./config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

module.exports = function(app) {

  var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  };

  app.use(allowCrossDomain);
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());

};