angular.module('userProfileFactory', [])
  .factory('userProfileFactory', function($location, $http, $state){

    var currentDevice = {};
    var currentTriggerDevice = {};

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
        console.log(currentDevice)
      }

      var assignTriggerDevice = function(username, apiKey, triggers){
        currentTriggerDevice.apiKey = apiKey;
        currentTriggerDevice.username = username;
        currentTriggerDevice.triggers = triggers;
      }

      var getTriggers = function() {
        return currentTriggerDevice;
      }

      var updateDeviceTrigger = function(deviceTrigger){
        console.log('currentTriggerDevice.username: ', currentTriggerDevice.username);
        console.log('currentTriggerDevice.apiKey: ', currentTriggerDevice.apiKey);
        console.log('deviceTrigger:', deviceTrigger);
        return $http({
          method: 'PUT',
          url: '/api/devices',
          data: {
            username: currentTriggerDevice.username,
            apiKey: currentTriggerDevice.apiKey,
            triggerName: deviceTrigger
          }
        })
        .then(function(dbResponse){
          console.log(dbResponse)
            return dbResponse.data;
        }, function(err){
          console.log(dbResponse)
          return dbResponse.data;
        })
      }

      var deleteDeviceData = function(apiKey, days){
        var m2xKeys = {
          master: deviceMasterKey,
          device: apiKey
        }
        var streams = [
          'water',
          'light',
          'temp'
        ]
        var currentTime = new Date();
        currentTime.setDate(currentTime.getDate() - days);

        var startTime = currentTime.getUTCFullYear()
                      + '-' + ("0" + (currentTime.getUTCMonth()+1)).slice(-2)
                      + '-' + ("0" + currentTime.getUTCDate()).slice(-2)
                      + 'T' + (currentTime.getUTCHours()+1)
                      + ':' + (currentTime.getUTCMinutes()+1)
                      + ':' + (currentTime.getUTCSeconds()+1) + 'Z';
        
        angular.forEach(streams, function(stream){
          console.log(stream);              
          return $http({
            method: 'DELETE',
            url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams/'+stream+'/values',
            headers: {
              "X-M2X-KEY": m2xKeys.master
            },
            contentType: 'application/json',
            params: {
              "from": "1980-01-01T01:00:00.000Z",
              "end": startTime
            }
          })
          .then(function(success){
            console.log('Delete data successful: ', success);
          }, function(err){
            console.log('Delete data unsuccessful: ', err);
          })
        })
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
            return {chartData: success,
              deviceName: currentDevice.deviceName
            };
          }, function(err){
            console.log("Data not retrieved");
          })
        }
      }

      var weatherForecast = function(zipcode){
        return $http({
            method: 'GET',
            url: "https://api.wunderground.com/api/e472269ffde1bf7f/forecast10day/q/"+zipcode+".json"
          })
          .then(function(success){
            return success;
          }, function(err){
            console.log("Data not retrieved");
        })
      }

      return {
        checkDevices: checkDevices,
        deleteDevice: deleteDevice,
        assignCurrentDevice: assignCurrentDevice,
        getTriggers: getTriggers,
        updateDeviceTrigger: updateDeviceTrigger,
        deleteDeviceData: deleteDeviceData,
        getChartData: getChartData,
        assignTriggerDevice: assignTriggerDevice,
        weatherForecast: weatherForecast
      }
    })
