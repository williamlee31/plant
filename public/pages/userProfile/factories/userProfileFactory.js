angular.module('userProfileFactory', [])
	.factory('userProfileFactory', function($location, $http, $state){

    var currentDevice = {};

    var checkDevices = function(username) {
      console.log('Checking for devices');
      return $http({
        method: 'GET',
        url: '/api/devices',
        params: {
          username: username
        }
      })
      .then(function(success){
        return success;
      }, function(err){
        console.log("Device not retrieved");
      })
    }

    var deleteDevice = function(deviceName, username) {
      return $http({
        method: 'DELETE',
        url: '/api/devices',
        headers: {"Content-Type": "application/json;charset=utf-8"},
        data: {
          username: username,
          devicename: deviceName,
        }
      })
      .then(function(dbResponse){
        if(dbResponse.status === 200){
          alert('Deleted ' + deviceName + ' from your profile');
          console.log('Device deleted');
          return true;
        }
      }, function(err){
        console.log('Device not deleted');
        return false;
      })
    }

    var assignCurrentDevice = function(deviceName, apiKey){
      currentDevice.deviceName = deviceName;
      currentDevice.apiKey = apiKey;
    }

    var getChartData = function(stream){
      if(currentDevice.apiKey){
        var m2xKeys = {
          master: deviceMasterKey,
          device: currentDevice.apiKey
        }
        return $http({
          method: 'GET',
          url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams/'+stream+'/values?limit=10000&pretty',
          headers: {
            "X-M2X-KEY": m2xKeys.master
          }
          // params: {
          //   start: ,
          //   end: ,
          //   limit: 30
          // }
        })
        .then(function(success){
          return success;
        }, function(err){
          console.log("Data not retrieved");
        })
      }
    }

    return {
      checkDevices: checkDevices,
      deleteDevice: deleteDevice,
      assignCurrentDevice: assignCurrentDevice,
      getChartData: getChartData
    }
  })
