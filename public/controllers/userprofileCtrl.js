angular.module('App',[
  ])
.controller('userprofileCtrl', function($scope, $http){

  $scope.deviceData = [];

  $scope.getData = function() {
    console.log('Fetching data');
    var m2xKeys = {
      master: "",
      device: ""
    }
    return $http({
      method: 'GET',
      url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams?pretty',
      headers: {
        "X-M2X-KEY": m2xKeys.master
      }
    })
    .then(function(success){
      $scope.deviceData.push(success.data.streams[1]);
      $scope.deviceData.push(success.data.streams[2]);
      $scope.deviceData.push(success.data.streams[3]);
      console.log($scope.deviceData);
    }, function(err){
      console.log("Data not retrieved");
    })
  }

})