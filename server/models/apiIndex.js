var deviceHelper = require('../helperFunctions/deviceHelper.js');
var userHelper = require('../helperFunctions/userHelper.js');

module.exports = {
  users: {
    get: function (callback, params) {
      console.log('+++line4: inside models get apiIndex.js');
      userHelper.getUser(callback, params);
    },
    post: function (callback) {
      console.log('+++line7: inside models post apiIndex.js')
    },
    delete: function (callback){
      console.log('+++line7: inside models post apiIndex.js')
    }
  },
  devices: {
    get: function (callback, params) {
      console.log('+++line12: inside models get devices apiIndex.js');
      deviceHelper.getDevices(callback, params);

    },
    post: function (callback, params) {
      console.log('+++line18: inside models post devices apiIndex.js');
      deviceHelper.regDevice(callback, params);
    },
    delete: function (callback, params) {
      console.log('+++line18: insde models post devices apiIndex.js');
      console.log('Params passed into device delete: ', params.devicename)
      deviceHelper.deleteDevice(callback, params);
    }
  }
}
