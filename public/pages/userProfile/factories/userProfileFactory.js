angular.module('userProfileFactory', [])
  .factory('userProfileFactory', function($location, $http, $state){

    var currentDevice = {};
    var currentTriggerDevice = {};

      var checkDevices = function(username) {
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
          return false;
        })
      }

      var deleteDevice = function(deviceName, username, apiKey) {
        return $http({
          method: 'POST',
           url: '/api/triggers',
           data: {
             username: username,
             apiKey: apiKey
           }
        }).then(function(success){
          var triggers = [
            success.data.dryTriggerid,
            success.data.drenchedTriggerid,
            success.data.dangerTriggerid
          ];
          angular.forEach(triggers, function(trigger){
            return $http({
              method: 'DELETE',
              url: 'https://api-m2x.att.com/v2/devices/'+apiKey+'/triggers/'+trigger,
              headers: {
                "X-M2X-KEY": deviceMasterKey
              }
            }).then(function(success){
              }, function(err){
              })
          })
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
            return true;
          }, function(err){
            return false;
          })
        }, function(err){
        })

      }

      var assignCurrentDevice = function(deviceName, apiKey){
        currentDevice.deviceName = deviceName;
        currentDevice.apiKey = apiKey;
      }

      var assignTriggerDevice = function(username, apiKey, triggers){
        currentTriggerDevice.apiKey = apiKey;
        currentTriggerDevice.username = username;
        currentTriggerDevice.triggers = triggers;
      }

      var newestTriggerInfo = function(username, apiKey){
        return $http({
          method: 'POST',
           url: '/api/triggers',
           data: {
             username: username,
             apiKey: apiKey
           }
        }).then(function(success){
          return success.data;
        }, function(err){
        })
      }

      var getTriggers = function() {
        return currentTriggerDevice;
      }

      var updateDeviceTrigger = function(deviceTrigger){
        var triggerid = deviceTrigger + 'id';

        if(currentTriggerDevice.triggers[deviceTrigger]){
          return $http({
            method: "PUT",
            url: 'https://api-m2x.att.com/v2/devices/'+currentTriggerDevice.apiKey+'/triggers/'+currentTriggerDevice.triggers[triggerid],
            headers: {
              "X-M2X-KEY": deviceMasterKey
            },
            data: {
              "status": "enabled"
            }
          }).then(function(success){
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
                return dbResponse.data;
            }, function(err){
              return dbResponse.data;
            })
          }, function(err){
          })
        }
        if(!currentTriggerDevice.triggers[deviceTrigger]){
          return $http({
            method: "PUT",
            url: 'https://api-m2x.att.com/v2/devices/'+currentTriggerDevice.apiKey+'/triggers/'+currentTriggerDevice.triggers[triggerid],
            headers: {
              "X-M2X-KEY": deviceMasterKey
            },
            data: {
              "status": "disabled"
            }
          }).then(function(success){
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
                return dbResponse.data;
            }, function(err){
              return dbResponse.data;
            })
          }, function(err){
          })
        }

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

        var ISOtime = currentTime.toISOString();

        angular.forEach(streams, function(stream){
          return $http({
            method: 'DELETE',
            url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams/'+stream+'/values',
            headers: {
              "X-M2X-KEY": m2xKeys.master
            },
            contentType: 'application/json',
            params: {
              "from": "1980-01-01T01:00:00.000Z",
              "end": ISOtime
            }
          })
          .then(function(success){
          }, function(err){
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
          })
        }
      }

      var weatherForecast = function(zipcode){
        return $http({
            method: 'GET',
            url: "https://api.wunderground.com/api/"+wundergroundKey+"/forecast10day/q/"+zipcode+".json"
          })
          .then(function(success){
            return success;
          }, function(err){
        })
      }

      var getLocation = function(zipcode){
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&sensor=true";
        return $http({
            method: 'GET',
            url: url
          })
          .then(function(success){
            return success.data;
          }, function(err){
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
        newestTriggerInfo: newestTriggerInfo,
        weatherForecast: weatherForecast,
        getLocation: getLocation
      }
    })
