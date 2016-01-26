angular.module('App.userprofileCtrl',[
  ])
.controller('userprofileCtrl', function($scope, $http){

  $scope.deviceData = [];

  $scope.userDevices;

  $scope.checkDevices = function() {
    var username = 'will';
    var url = '/api/devices?username='+username
    console.log('Checking for devices');
    return $http({
      method: 'GET',
      url: url 
    })
    .then(function(success){
      $scope.userDevices = success.data;
    }, function(err){
      console.log("Data not retrieved");
    })
  }

  $scope.getData = function() {
    $scope.deviceData = [];
    $scope.checkDevices()
    .then(
      function(){
      console.log('Fetching data');
      for(var i = 0; i < $scope.userDevices.length; i++){
        var m2xKeys = {
          master: deviceMasterKey,
          device: $scope.userDevices[i].apiKey
        }
        return $http({
          method: 'GET',
          url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams?pretty',
          headers: {
            "X-M2X-KEY": m2xKeys.master
          }
        })
        .then(function(success){
          var water = success.data.streams[1].name;
          var light = success.data.streams[2].name;
          var temp = success.data.streams[3].name;
          var waterVal = success.data.streams[1].value;
          var lightVal = success.data.streams[2].value;

          var deviceData = {
            temp: Math.floor(success.data.streams[3].value * 1.8 + 32) + '°F'
          }

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
            name: $scope.userDevices[i].name,
            data: deviceData
          })
        }, function(err){
          console.log("Data not retrieved");
        })
      }
    });
}
})