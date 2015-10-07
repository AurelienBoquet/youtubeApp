'use strict';

var db = require('../../config/db');
var utils = require('../../utils/utils');
var crypto = require('crypto');

exports.signUp = function(socket, data) {
  db.users.findOne({$or: [{'email': data.email}, {'username': data.username} ]},
    function(err, user) {

      var password = utils.createPassword(data.password, 'utf8', 'hex');

      var userData = {
        username: data.username,
        email: data.email,
        password: password,
        token: crypto.randomBytes(40).toString('base64')
      };

      db.users.insert(userData, function (err, user) {
        if (user) {
          socket.emit('signup', user);
        }
      });

    });
};

exports.signIn = function(socket, data) {
  db.users.findOne({$or: [{'email': data.login}, {'username': data.login} ]},
    function(err, user) {
      if (err) { console.log(err) }

      if (user) {
        var password = utils.createPassword(data.password, 'utf8', 'hex');

        if (password === user.password) {

          if (!data.uid) {
            user.uid = utils.createRandomString(15);
            db.users.update({_id: user._id}, { $push: { uid: user.uid }});
          }

          if (!user.token) {
            user.token = crypto.randomBytes(40).toString('base64');
            db.users.update({_id: user._id}, { $set: { token: user.token }});
          }

          socket.emit('signin', user);
          socket.join(user._id);
        }
      } else {
        console.log('signin', 'no user found');
      }
    });
};

exports.isLoggedIn = function(socket, token) {
  db.users.findOne({token: token}, function(err, user) {
    if (err) { console.log(err); }

    if (user) {
      socket.emit('loggedIn', user);
    }
  });
};

