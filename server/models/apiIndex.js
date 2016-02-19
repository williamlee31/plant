var deviceHelper = require('../helperFunctions/deviceHelper.js');
var userHelper = require('../helperFunctions/userHelper.js');

module.exports = {
  users: {
    get: function (callback, params) {
      userHelper.getUser(callback, params);
    },
    post: function (callback) {
    },
    put: function (callback) {
    },
    delete: function (callback){
    }
  },
  devices: {
    get: function (callback, params) {
      deviceHelper.getDevices(callback, params);
    },
    post: function (callback, params) {
      deviceHelper.regDevice(callback, params);
    },
    put: function (callback, params) {
      deviceHelper.updateDeviceTrigger(callback, params);
    },
    delete: function (callback, params) {
      deviceHelper.deleteDevice(callback, params);
    }
  },
  triggers: {
    get: function (callback, params) {
    },
    post: function (callback, params) {
      deviceHelper.getDeviceTriggers(callback, params);
    },
    put: function (callback, params) {
      deviceHelper.updateTriggerID(callback, params);
    },
    delete: function (callback, params) {
    }
  }
}
