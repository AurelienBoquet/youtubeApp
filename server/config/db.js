var mongojs = require('mongojs'),
    config = require('./config');

var db = mongojs('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db, ['users', 'connexion']);

module.exports = db;