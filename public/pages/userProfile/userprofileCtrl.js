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
.controller('userProfileCtrl', function($scope, $http, showAlertSrvc, appFactory, userProfileFactory){

  $scope.signout = appFactory.signout;

  $scope.loading = showAlertSrvc(2000);
  $scope.deviceData = [];
  $scope.userDevices = {};
  $scope.userInfo = {};
  $scope.plants = {
    hidden: true
  };
  $scope.currentGraphData = {};
  $scope.charts = {
    hidden: true
  };
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
            console.log('+++line42 Data from device: ', success.data);
            var deviceData = {};
            var streamName = checkDataStreamName(success.data);

            checkWaterVal(streamName.waterVal, deviceData);
            checkLightVal(streamName.lightVal, deviceData);
            checkTempVal(streamName.tempVal, deviceData);


            $scope.deviceData.push({
              user: $scope.userInfo.username,
              name: device.name,
              data: deviceData,
              apiKey: device.apiKey,
              triggers: {
                dangerTrigger: device.dangerTrigger,
                dryTrigger: device.dryTrigger,
                drenchedTrigger: device.drenchedTrigger
              }
            })

            $scope.pageLoad();

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
    $scope.charts.hidden = $scope.charts.hidden === false ? true: false;
    $scope.currentDevice.name = deviceName;
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
        $scope.charts.hidden = true;
      }
    });
  }

  $scope.pageLoad = function() {
    if($scope.deviceData.length < 1){
      $scope.plants.hidden = true;
    } else {
      $scope.plants.hidden = false;
    }
  }

  $scope.init = function() {
    appFactory.getUser().then(function(result){
      $scope.userInfo = result.data;
      $scope.getData();
      $scope.pageLoad();
    })
  }

  $scope.init();
})

// Helper Function

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
    deviceData.water = '';
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
    deviceData.light = '';
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
