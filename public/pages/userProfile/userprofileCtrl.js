angular.module('App.userProfileCtrl',[
  ])
.service('showAlertSrvc', ['$timeout', function($timeout) {
  return function(delay) {
    var result = {hidden:true};
    $timeout(function() {
      result.hidden=false;
    }, delay);
    return result;
  };
}])
.controller('userProfileCtrl', function ($scope, $http, showAlertSrvc, appFactory, userProfileFactory, $uibModal, $log){

  $scope.signout = appFactory.signout;

  $scope.loading = showAlertSrvc(1000);
  $scope.deviceData = [];
  $scope.userDevices = {};
  $scope.userInfo = {};
  $scope.plants = {
    hidden: true
  };
  $scope.currentGraphData = {};
  $scope.currentDevice = {};

  $scope.getData = function() {
    $scope.deviceData = [];
    userProfileFactory.checkDevices($scope.userInfo.username)
    .then(
      function(result){
        $scope.userDevices = result.data
        angular.forEach($scope.userDevices , function(device){
          var m2xKeys = {
            master: deviceMasterKey,
            device: device.apiKey
          }
          return $http({
            method: 'GET',
            url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams?pretty',
            headers: {
              "X-M2X-KEY": m2xKeys.master
            }
          })
          .then(function(success){
            userProfileFactory.deleteDeviceData(device.apiKey, 3);

            var deviceData = {};
            var streamName = checkDataStreamName(success.data);

            checkWaterVal(streamName.waterVal, deviceData);
            checkLightVal(streamName.lightVal, deviceData);
            checkTempVal(streamName.tempVal, deviceData);

            $scope.displayForecast(device.zipCode).then(function(weather){
              userProfileFactory.getLocation(device.zipCode).then(function(location){
                var image;
                var chanceofRain = false;
                for(var i = 0; i < weather.length; i++){
                  if(weather[i].forecast === 'rain'){
                    chanceofRain = true
                  }
                }
                if(chanceofRain === true){
                  image = {src: '../img/icons/rain.png'};
                } else if(chanceofRain === false){
                  image = {src: '../img/icons/light.png'};
                }

                var location = location.results[0].address_components[1].long_name + ", " + location.results[0].address_components[3].short_name;
                $scope.deviceData.push({
                  user: $scope.userInfo.username,
                  name: device.name,
                  data: deviceData,
                  apiKey: device.apiKey,
                  weather: weather,
                  location: location,
                  image: image,
                  chanceofRain, chanceofRain,
                  triggers: {
                    dangerTrigger: device.dangerTrigger,
                    dryTrigger: device.dryTrigger,
                    drenchedTrigger: device.drenchedTrigger
                  }
                })
                console.log($scope.deviceData);
                $scope.pageLoad();
              })
            })


          }, function(err){
            console.log("Data not retrieved");
          })
        })
      }
    )
  }

  $scope.prepareCharts = function(deviceName) {
    var apiKey;
    angular.forEach($scope.userDevices, function(device){
      if(device.name === deviceName){
        apiKey = device.apiKey;
        return;
      }
    })
    $('#mainChart').html("");
    userProfileFactory.assignCurrentDevice(deviceName, apiKey);
    $scope.currentDevice.name = deviceName;
  }

  $scope.prepareTriggers = function(apiKey, triggers){
    userProfileFactory.assignTriggerDevice($scope.userInfo.username, apiKey, triggers);
  }

  $scope.updateDeviceTrigger = function(apiKey, triggerName) {
    userProfileFactory.updateDeviceTrigger($scope.userInfo.username, apiKey, triggerName).then(function(result){
      alert(result);
    })
  }

  $scope.deleteDevice = function(deviceName) {
    userProfileFactory.deleteDevice(deviceName, $scope.userInfo.username).then(function(result){
      if(result){
        $scope.init();
      }
    });
  }

  $scope.deleteAllDeviceData = function(apiKey) {
    userProfileFactory.deleteDeviceData(apiKey, 0);
  }

  $scope.pageLoad = function() {
    if($scope.deviceData.length < 1){
      $scope.plants.hidden = true;
    } else {
      $scope.plants.hidden = false;
    }
  }

  $scope.displayForecast = function(zipCode){
    return userProfileFactory.weatherForecast(zipCode)
    .then(function(results){
      console.log('WEATHER API: ', results)
      var weather = [];
      var response = results.data.forecast.simpleforecast.forecastday;
      console.log("+++++ line 9: ", response)
      for(var i = 0; i < 7; i++){
        var conditions = response[i].conditions.split(' ');
        var isRaining = false;
        for(var j = 0; j < conditions.length; j++){
          if(conditions[j] === "Rain"){
            isRaining = true;
          }
        }
        if(isRaining === true){
          weather.push({
            day: response[i].date.weekday_short,
            date: response[i].date.monthname_short + ' ' + response[i].date.day,
            forecast: 'rain',
            src: '../img/icons/rain.png'
          })
        } else if(isRaining === false){
          weather.push({
            day: response[i].date.weekday_short,
            date: response[i].date.monthname_short + ' ' + response[i].date.day,
            forecast: 'no rain',
            src: '../img/icons/light.png'
          })
        }
      }
      return weather;
    })
  }

  $scope.init = function() {
    appFactory.getUser().then(function(result){
      $scope.userInfo = result.data;
      $scope.getData();
      $scope.pageLoad();
    })
  }

  $scope.init();

});

// Helper Functions

function checkDataStreamName(data){
  results = {
    waterVal: null,
    lightVal: null,
    tempVal: null
  };
  for(var j = 0; j < data.streams.length; j++){
    if(data.streams[j].name === 'water'){
      results.waterVal = data.streams[j].value;
    } else if (data.streams[j].name === 'light'){
      results.lightVal = data.streams[j].value;
    } else if (data.streams[j].name === 'temp'){
      results.tempVal = data.streams[j].value;
    }
  }

  return results;
}

function checkWaterVal(waterVal, deviceData) {
  if (waterVal === null){
    deviceData.waterVal = 'N/A';
    deviceData.water = 'N/A';
  } else {
    deviceData.waterVal = '(' + waterVal + ')';
    if(waterVal <= 100){
      deviceData.water = 'danger';
    } else if (waterVal > 100 && waterVal <= 400) {
      deviceData.water = 'dry';
    } else if (waterVal > 400 && waterVal <= 700) {
      deviceData.water = 'perfect';
    } else if (waterVal > 700) {
      deviceData.water = 'drenched';
    }
  }
}

function checkLightVal(lightVal, deviceData) {
  if(lightVal === null){
    deviceData.lightVal = 'N/A';
    deviceData.light = 'N/A';
  } else {
    deviceData.lightVal = '(' + lightVal + ')';
    if(lightVal < 340 && lightVal !== 0){
      deviceData.light = 'sunny';
    } else if (lightVal >= 340 && lightVal <= 680) {
      deviceData.light = 'partial shade';
    } else if (lightVal > 680 || lightVal === 0) {
      deviceData.light = 'shade'
    }
  }
}

function checkTempVal(tempVal, deviceData) {
  if(tempVal === null){
    deviceData.temp = 'N/A';
  } else {
    deviceData.temp = Math.floor(tempVal * 1.8 + 32) + '°F'
  }
}
