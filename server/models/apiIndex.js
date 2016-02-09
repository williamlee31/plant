var deviceHelper = require('../helperFunctions/deviceHelper.js');
var userHelper = require('../helperFunctions/userHelper.js');

module.exports = {
  users: {
    get: function (callback, params) {
      console.log('+++line7: inside models users get apiIndex.js');
      userHelper.getUser(callback, params);
    },
    post: function (callback) {
      console.log('+++line11: inside models users post apiIndex.js')
    },
    put: function (callback) {
      console.log('+++line14: inside models users post apiIndex.js')
    },
    delete: function (callback){
      console.log('+++line17: inside models users delete apiIndex.js')
    }
  },
  devices: {
    get: function (callback, params) {
      console.log('+++line22: inside models get devices apiIndex.js');
      deviceHelper.getDevices(callback, params);
    },
    post: function (callback, params) {
      console.log('+++line26: inside models post devices apiIndex.js');
      deviceHelper.regDevice(callback, params);
    },
    put: function (callback, params) {
      console.log('+++line30: inside models put devices apiIndex.js');
      deviceHelper.updateDeviceTrigger(callback, params);
    },
    delete: function (callback, params) {
      console.log('+++line34: insde models post devices apiIndex.js');
      console.log('Params passed into device delete: ', params.devicename)
      deviceHelper.deleteDevice(callback, params);
    }
  },
  triggers: {
    get: function (callback, params) {
      console.log('+++line41: inside models get triggers apiIndex.js');    },
    post: function (callback, params) {
      console.log('+++line44: inside models post triggers apiIndex.js');
      deviceHelper.getDeviceTriggers(callback, params);
    },
    put: function (callback, params) {
      console.log('+++line47: inside models put triggers apiIndex.js');
      deviceHelper.updateTriggerID(callback, params);
    },
    delete: function (callback, params) {
      console.log('+++line51: insde models post triggers apiIndex.js');
    }
  }
}
