var emailHelper = require('../helperFunctions/emailHelper.js');

module.exports = {
  welcome: {
    get: function (callback, params) {
      console.log('+++line6: inside models get welcome notifyIndex.js')

    },
    post: function (callback, params) {
      console.log('+++line10: inside models post welcome notifyIndex.js')
      emailHelper.welcomeMessage(callback, params);
    }
  },
  alert: {
    get: function (callback, params) {
      console.log('+++line16: inside models get alert notifyIndex.js')

    },
    post: function (callback, params) {
      console.log('+++line20: inside models post alert notifyIndex.js')
      emailHelper.triggerCallback(callback, params);
    }
  }
}
