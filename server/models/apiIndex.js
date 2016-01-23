var deviceHelper = require('../helperFunctions/deviceHelper.js');

module.exports = {
  users: {
    get: function (callback) {
      console.log('+++line4: inside models get apiIndex.js');
    },
    post: function (callback) {
      console.log('+++line7: inside models post apiIndex.js')
    }
  },
  devices: {
    get: function (callback, params) {
      console.log('+++line12: inside models get devices apiIndex.js');

    },
    post: function (callback, params) {
      console.log('+++line18: insde models post devices apiIndex.js');
      deviceHelper.regDevice(callback, params);
    }
  }
}
