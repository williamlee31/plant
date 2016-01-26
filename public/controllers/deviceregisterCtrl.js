angular.module('App.deviceregisterCtrl',[
  ])
.controller('deviceregisterCtrl', function($scope, $http, appFactory){

        $scope.deviceData = {};
        $scope.device = {};

        $scope.registerDevice = function() {
          console.log('Registering device');
          console.log('Registering device, name should be logged in name: ', appFactory.user)
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
            console.log($scope.device);
            console.log(success);
            return $http({
              method: 'POST',
              url: '/api/devices', // api post devicekey route to database
              data: {
                name: $scope.device.name,
                apiKey: $scope.device.key,
                username: appFactory.user // grab username from appfactory
              }
            })
            .then(function(dbResponse){
              alert('Device registered.');
              console.log('dbResponse: ', dbResponse);
              if(dbResponse === 202){
                alert('Device registered.')
                console.log('Device registered.')
              } else if(dbResponse === 404) {
                alert('Device already registered.')
                console.log('Device already registered.')
              }
            })
          }, function(err){
            alert('You done goofed!');
            // inform user of incorrect key
          })
        }



})