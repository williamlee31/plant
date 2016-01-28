angular.module('App.userprofileCtrl',[
  ])
.controller('userprofileCtrl', function($scope, $http){

  $scope.deviceData = [];
  $scope.userDevices;
  $scope.username;
  $scope.test = {
    hidden: true
  }

  $scope.getUser = function() {
    return $http({
      method: 'GET',
      url: '/api/users',
      params: {
        token: window.localStorage.token
      }
    }).then(function(success){
      $scope.username = success.data.username;
    }, function(err){
      console.log('User not loaded');
    })
  }

  $scope.checkDevices = function() {
    var username = $scope.username;
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
            for(var j = 0; j < success.data.streams.length; j++){
              if(success.data.streams[j].name === 'water'){
                var waterVal = success.data.streams[j].value;
              } else if (success.data.streams[j].name === 'light'){
                var lightVal = success.data.streams[j].value;
              } else if (success.data.streams[j].name === 'temp'){
                var tempVal = success.data.streams[j].value;
              }
            }

            var deviceData = {
              temp: Math.floor(tempVal * 1.8 + 32) + '°F'
            }

            deviceData.waterVal = waterVal;
            deviceData.lightVal = lightVal;

            if(lightVal < 340 && lightVal !== 0){
              deviceData.light = 'sunny';
            } else if (lightVal >= 340 && lightVal <= 680) {
              deviceData.light = 'partial shade';
            } else if (lightVal > 680 || lightVal === 0) {
              deviceData.light = 'shade'
            }

            if(waterVal <= 100){
              deviceData.water = 'danger';
            } else if (waterVal > 100 && waterVal <= 400) {
              deviceData.water = 'dry';
            } else if (waterVal > 400 && waterVal <= 700) {
              deviceData.water = 'perfect';
            } else if (waterVal > 700) {
              deviceData.water = 'drenched';
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
    console.log('user name to be deleted: ', $scope.username);
    return $http({
      method: 'DELETE',
      url: '/api/devices',
      headers: {"Content-Type": "application/json;charset=utf-8"},
      data: {
        username: $scope.username,
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
      $scope.test.hidden = true;
    } else {
      $scope.test.hidden = false;
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