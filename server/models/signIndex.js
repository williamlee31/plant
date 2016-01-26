var signHelper = require('../helperFunctions/signHelper.js');
var authHelper = require('../helperFunctions/authHelper.js');

module.exports = {
  signin: {
    get: function (callback, params) {
      console.log('+++line4: inside models get signIndex.js: ', params);
    },
    post: function (callback, params) {
      console.log('+++line7: inside models post signIndex.js: ', params);
      signHelper.signIn(callback, params);
    }
  },
  signup: {
    get: function (callback, params) {
      console.log('+++line12: inside models get signIndex.js');
    },
    post: function (callback, params) {
      console.log('+++line15: inside models post signIndex.js');
      signHelper.signUp(callback, params);
    }
  },
  logout: {
    get: function (callback, params) {
      console.log('+++line25: inside models get signIndex.js');
      signHelper.logout(callback, params);
    },
    post: function (callback, params) {
      console.log('+++line29: inside models post signIndex.js');
    }
  },
  auth: {
    get: function (callback, params) {
      console.log('+++line56: inside controllers get signIndex.js');
      authHelper.getToken(callback, params);
    },
    post: function (callback, params) {
      console.log('+++line56: inside controllers post signIndex.js');
    }
  }
}
