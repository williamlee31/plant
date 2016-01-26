angular.module('App.userprofileCtrl',[
  ])
.controller('userprofileCtrl', function($scope, $http){

  $scope.deviceData = ['', '', ''];
  $scope.user = {};

  $scope.checkDevices = function() {
    var username = 'will';
    var url = '/api/devices?username='+username
    console.log('Checking for devices');
    return $http({
      method: 'GET',
      url: url 
    })
    .then(function(success){
      $scope.user.device = success;
      console.log($scope.user.device);
    }, function(err){
      console.log("Data not retrieved");
    })
  }

  $scope.getData = function() {
    $scope.checkDevices();
    console.log('Fetching data');
    var m2xKeys = {
      master: deviceMasterKey, // hide inside not pushed file
      device: 'f990e644186d0c7ecde4eb454934ae2f'
    }
    return $http({
      method: 'GET',
      url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams?pretty',
      headers: {
        "X-M2X-KEY": m2xKeys.master
      }
    })
    .then(function(success){
      $scope.deviceData[0] = success.data.streams[1];
      $scope.deviceData[1] = success.data.streams[2];
      $scope.deviceData[2] = success.data.streams[3];
      console.log($scope.deviceData);
    }, function(err){
      console.log("Data not retrieved");
    })
  }

})