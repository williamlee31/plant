angular.module('App.deviceregisterCtrl',[
  ])
.controller('deviceregisterCtrl', function($scope, $http){

  $scope.deviceData = {};
  $scope.device = {};
  $scope.username;

  $scope.registerDevice = function() {
    console.log('Registering device');
    var m2xKeys = {
      master: deviceMasterKey, // hide inside not pushed file
      device: $scope.device.key
    }
    return $http({
      method: 'GET',
      url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams?pretty',
      headers: {
        "X-M2X-KEY": m2xKeys.master
        }
    })
    .then(function(success){
      return $http({
        method: 'POST',
        url: '/api/devices', // api post devicekey route to database
        data: {
          name: $scope.device.name,
          apiKey: $scope.device.key,
          username: $scope.username // grab username from appfactory
        }
      })
      .then(function(dbResponse){
        console.log('dbResponse: ', dbResponse);
        if(dbResponse.status === 200){
          alert('Added ' + $scope.device.name + ' to your profile')
          console.log('Device registered!!')
        }
      }, function(err){
        alert('Device already registered');
      })
    }, function(err){
      alert('You done goofed!');
      // inform user of incorrect key
    })
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
      console.log('User not loaded')
    })
  }

  $scope.init = function() {
    $scope.getUser();
  }

  $scope.init();
        
})