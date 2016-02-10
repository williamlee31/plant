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
          console.log('Successfully grabbed trigger data: ', success.data);
          var triggers = [
            success.data.dryTriggerid,
            success.data.drenchedTriggerid,
            success.data.dangerTriggerid
          ];
          angular.forEach(triggers, function(trigger){
            console.log('Deleting trigger on M2X for ', trigger);
            return $http({
              method: 'DELETE',
              url: 'https://api-m2x.att.com/v2/devices/'+apiKey+'/triggers/'+trigger,
              headers: {
                "X-M2X-KEY": deviceMasterKey
              }
            }).then(function(success){
                console.log(success);
              }, function(err){
                console.log(err);
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
            console.log('Device deleted');
            return true;
          }, function(err){
            console.log('Device not deleted');
            return false;
          })
        }, function(err){
          console.log(err)
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
        console.log('Here is the data you need: ', currentTriggerDevice)

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
          console.log(err)
        })
      }

      var getTriggers = function() {
        return currentTriggerDevice;
      }

      var updateDeviceTrigger = function(deviceTrigger){
        console.log('deviceTrigger:', deviceTrigger);
        var triggerid = deviceTrigger + 'id';

        console.log(currentTriggerDevice.triggers[deviceTrigger]);

        if(currentTriggerDevice.triggers[deviceTrigger]){
          console.log('Trigger is currently off, switching to on');
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
            console.log('Trigger updated on M2X, proceeding to change in database.');
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
          }, function(err){
            console.log(err)
          })
        }
        if(!currentTriggerDevice.triggers[deviceTrigger]){
          console.log('Trigger is currently on, switching to off');
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
            console.log('Trigger updated on M2X, proceeding to change in database.');
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
          }, function(err){
            console.log(err)
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
            url: "https://api.wunderground.com/api/"+wundergroundKey+"/forecast10day/q/"+zipcode+".json"
          })
          .then(function(success){
            return success;
          }, function(err){
            console.log("Data not retrieved");
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
        newestTriggerInfo: newestTriggerInfo,
        weatherForecast: weatherForecast,
        getLocation: getLocation
      }
    })
