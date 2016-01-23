var signHelper = require('../helperFunctions/signHelper.js');

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
    get: function (callback) {
      console.log('+++line20: inside models get signIndex.js');
    },
    post: function (callback) {
      console.log('+++line23: inside models post signIndex.js');
    }
  }
}
