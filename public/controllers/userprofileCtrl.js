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
    $scope.checkDevices().then(function(){
      console.log('Fetching data');
      $scope.deviceData = [];
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
          var deviceData = {
            water: success.data.streams[1].value,
            light: success.data.streams[2].value,
            temp: success.data.streams[3].value
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