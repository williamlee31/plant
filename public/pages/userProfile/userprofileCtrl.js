angular.module('App.userprofileCtrl',[
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
.controller('userprofileCtrl', function($scope, $http, showAlertSrvc){

  $scope.loading = showAlertSrvc(1500);
  $scope.deviceData = [];
  $scope.userDevices;
  $scope.userInfo;
  $scope.plants = {
    hidden: true
  }
  console.log($scope.loading);

  $scope.getUser = function() {
    return $http({
      method: 'GET',
      url: '/api/users',
      params: {
        token: window.localStorage.token
      }
    }).then(function(success){
      $scope.userInfo = success.data;
    }, function(err){
      console.log('User not loaded');
    })
  }

  $scope.checkDevices = function() {
    var username = $scope.userInfo.username;
    var url = '/api/devices?username='+username
    console.log('Checking for devices');
    return $http({
      method: 'GET',
      url: url 
    })
    .then(function(success){
      $scope.userDevices = success.data;
    }, function(err){
      console.log("Device not retrieved");
    })
  }

  $scope.getData = function() {
    $scope.deviceData = [];
    $scope.checkDevices()
    .then(
      function(){
        console.log('Fetching data');
        console.log('Your devices: ', $scope.userDevices);
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
            console.log('Data from device: ', success.data);

            var waterVal, lightVal, tempVal;

            for(var j = 0; j < success.data.streams.length; j++){
              if(success.data.streams[j].name === 'water'){
                waterVal = success.data.streams[j].value;
              } else if (success.data.streams[j].name === 'light'){
                lightVal = success.data.streams[j].value;
              } else if (success.data.streams[j].name === 'temp'){
                tempVal = success.data.streams[j].value;
              }
            }

            var deviceData = {};

            if (waterVal === undefined){
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
            if(lightVal === undefined){
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
            if(tempVal === undefined){
              deviceData.temp = 'N/A';
            } else {
              deviceData.temp = Math.floor(tempVal * 1.8 + 32) + '°F'
            }

            $scope.deviceData.push({
              name: device.name,
              data: deviceData
            })

            $scope.pageLoad();
            
          }, function(err){
            console.log("Data not retrieved");
          })
        })
      }
    )
  }

  $scope.deleteDevice = function(deviceName) {
    console.log('device name to be deleted: ', deviceName);
    console.log('user name to be deleted: ', $scope.userInfo.username);
    return $http({
      method: 'DELETE',
      url: '/api/devices',
      headers: {"Content-Type": "application/json;charset=utf-8"},
      data: {
        username: $scope.userInfo.username,
        devicename: deviceName,
      }
    })
    .then(function(dbResponse){
      if(dbResponse.status === 200){
        alert('Deleted ' + deviceName + ' from your profile');
        console.log('Device deleted');
        $scope.init()
      }
    }, function(err){
      console.log('Device not deleted');
    })
  }

  $scope.pageLoad = function() {
    console.log('deviceData :', $scope.deviceData)
    if($scope.deviceData.length < 1){
      $scope.plants.hidden = true;
    } else {
      $scope.plants.hidden = false;
    }
  }    

  $scope.init = function() {
    $scope.getUser().then(function(){
        $scope.getData();
        $scope.pageLoad();
    })
  }

  $scope.init();
})