var config = require('../config/config');
var crypto = require('crypto');
var algorithm = config.crypto.algo;
var key = config.crypto.key;

var utils = {
  createPassword: function(data, dataEncoding, encoding, finalEncoding) {
    "use strict";

    var cipher = crypto.createCipher(algorithm, key);

    var enc = (encoding) ? encoding : 'hex';
    var dataEnc = (dataEncoding) ? dataEncoding : 'utf8';
    var finalEnc = (finalEncoding) ? finalEncoding : 'hex';

    return cipher.update(data, dataEnc, enc) + cipher.final(finalEnc);
  },
  createRandomString: function(len) {
    var text = '';
    var charset = 'azertyuiopqsdfghjklmwxcvbn123456789!+-,!%AZERTYUIOPQSDFGHJKLMWXCVBN';

    for (var i = 0; i < len; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    return text;
  }
};

module.exports = utils;
