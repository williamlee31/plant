angular.module('App.userprofile-registerCtrl',['ngAnimate', 'ui.bootstrap'
  ])
.controller('userprofile-registerCtrl', function ($scope, $http, $uibModal, $log, $state){

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalRegContent.html',
      controller: 'ModalInstanceRegCtrl',
      size: size
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.triggerm2xGET = function() {
    console.log('checking trigger...');
    var m2xKeys = {
      master: deviceMasterKey, // hide inside not pushed file
      device: deviceKey
    }
    return $http({
      method: 'GET',
      url: 'https://api-m2x.att.com/v2/devices/'+deviceKey+'/triggers',
      headers: {
        "X-M2X-KEY": m2xKeys.master
      }
    }).
    then(function(success) {
      console.log('success ', success);
    }), function(err) {
      console.log('err: ', err);
    }
  }

  $scope.triggerm2xPOST = function() {
    console.log('checking POST trigger...');
    var m2xKeys = {
      master: deviceMasterKey, // hide inside not pushed file
      device: deviceKey
    }

    return $http({
      method: "POST",
      url: 'https://api-m2x.att.com/v2/devices/'+deviceKey+'/triggers',
      headers: {
        "X-M2X-KEY": "7f4b3ddf06944e06a87d0cc8aef754ad"
      },
      data: { "name": "Low-Water",
              "conditions": {
                "water": { "changed": true }
              },
              "frequency": "continuous",
              "callback_url": "http://requestb.in/oftl8uof",
              "status": "enabled"
              // "send_location": false
            }
    }).
    then(function(success) {
      console.log('success: ', success);
    }), function(err) {
      console.log('err: ', err);
    }
  }
});


angular.module('App.userprofile-registerCtrl').controller('ModalInstanceRegCtrl', function ($scope, $uibModalInstance, $http, appFactory, $location, $state) {

  $scope.deviceData = {};
  $scope.device = {};
  $scope.username;
  $scope.state = $state;
  $scope.errorMessage = '';
  $scope.showModal = false;
  $scope.invalidDeviceAlert = false;
  $scope.registeredAlert = false;
  $scope.addDeviceAlert = false;

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
      registerAllM2X(m2xKeys.device);
      return $http({
        method: 'POST',
        url: '/api/devices', // api post devicekey route to database
        data: {
          name: $scope.device.name,
          apiKey: $scope.device.key,
          zipCode: $scope.device.zipCode,
          username: $scope.username // grab username from appfactory
        }
      })
      .then(function(dbResponse){
        console.log('dbResponse: ', dbResponse);
        if(dbResponse.status === 200){
          $scope.state.go($state.current, {}, {reload: true});
          $uibModalInstance.close()
        }
      }, function(err){
        console.log('err: ', err);
        $scope.registeredAlert = true;
      })
    }, function(err){
      console.log('err: ', err);
        $scope.invalidDeviceAlert = true;
    })
  }

  $scope.toggleModal = function() {
    $scope.invalidDeviceAlert = false;
    $scope.registeredAlert = false;
    $scope.showModal = !$scope.showModal;
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.init = function() {
    appFactory.getUser().then(function(success){
      $scope.username = success.data.username;
    });
  }

  $scope.init();


  function registerAllM2X (apiKey) {
    var triggers = ['dry alert', 'danger alert', 'drenched alert'];

    return $http({
      method: 'GET',
      url: 'https://api-m2x.att.com/v2/devices/'+apiKey+'/triggers',
        headers: {
          "X-M2X-KEY": deviceMasterKey
        }
    }).then(function(success){
      console.log(success);
      console.log('Device has ' + success.data.triggers.length + ' trigger(s).');
      if(success.data.triggers.length === 0){
        console.log('Setting up default triggers to new device.');
        angular.forEach(triggers, function (trigger) {
          var alert = {};
          if(trigger === 'dry alert'){
            alert.name = "Low moisture levels (dry)";
            alert.triggername = 'dryTrigger';
            alert.conditions = {
              "water": {
                "lte": 400,
                "gt": 100
              }
            }
          }
          if(trigger === 'danger alert'){
            alert.name = "Extremely low moisture levels (danger)";
            alert.triggername = 'dangerTrigger';
            alert.conditions = {
              "water": {
                "lte": 100
              }  
            }
          }
          if(trigger === 'drenched alert'){
            alert.name = "Extremely high moisture levels (drenched)";
            alert.triggername = 'drenchedTrigger';
            alert.conditions = {
              "water": {
                "gt": 700
              }  
            }  
          }
          console.log('Adding trigger ' + alert.name + ' to m2x, under the apikey ' + apiKey)

          return $http({
            method: 'POST',
            url: 'https://api-m2x.att.com/v2/devices/'+apiKey+'/triggers',
            headers: {
              "X-M2X-KEY": deviceMasterKey
            },
            data: {
              "name": alert.name,
              "conditions": alert.conditions,
              "frequency": "periodic",
              "interval": 43200,
              "callback_url": "http://bloomapp.herokuapp.com/notifications/alert",
              "status": "disabled"
            }
          }).then(function(success) {
            return $http({
              method: 'PUT',
              url: '/api/triggers',
              data:{
                username: $scope.username,
                apiKey: apiKey,
                triggername: alert.triggername,
                triggerid: success.data.id
              }
            }).then(function(success){
              console.log('Successfully registered ' + alert.name + ' trigger for ' + $scope.device.name);
            }), function(err) {
              console.log('err: ', err);
            }
          }), function(err) {
            console.log('err: ', err);
          }
        })
      } else {
        console.log('Device already has triggers set up!');
      }
    })

  }

})
