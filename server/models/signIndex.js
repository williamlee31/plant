var signHelper = require('../helperFunctions/signHelper.js');
var authHelper = require('../helperFunctions/authHelper.js');

module.exports = {
  signin: {
    get: function (callback, params) {
    },
    post: function (callback, params) {
      signHelper.signIn(callback, params);
    }
  },
  signup: {
    get: function (callback, params) {
    },
    post: function (callback, params) {
      signHelper.signUp(callback, params);
    }
  },
  logout: {
    get: function (callback, params) {
      signHelper.logout(callback, params);
    },
    post: function (callback, params) {
    }
  },
  auth: {
    get: function (callback, params) {
      authHelper.getToken(callback, params);
    },
    post: function (callback, params) {
    }
  }
}
