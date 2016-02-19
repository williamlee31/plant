var emailHelper = require('../helperFunctions/emailHelper.js');

module.exports = {
  welcome: {
    get: function (callback, params) {
    },
    post: function (callback, params) {
      emailHelper.welcomeMessage(callback, params);
    }
  },
  alert: {
    get: function (callback, params) {
    },
    post: function (callback, params) {
      emailHelper.triggerCallback(callback, params);
    }
  }
}
