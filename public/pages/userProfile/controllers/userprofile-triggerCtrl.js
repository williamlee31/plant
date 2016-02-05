angular.module('App.userprofile-triggerCtrl',['ui.bootstrap','ngAnimate'])
.controller('userprofile-triggerCtrl', function ($scope, $http, userProfileFactory, appFactory, $uibModal, $log){

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalTriggerContent.html',
      controller: 'ModalInstanceTriggerCtrl',
      size: size
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }; 

  $scope.userInfo = {};

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
      data: { 
        "name": "Low-Water",
        "conditions": {
        "water": { "changed": true }
      },
        "frequency": "continuous",
        "callback_url": "http://requestb.in/oftl8uof",
        "status": "enabled"
      }
    }).
    then(function(success) {
      console.log('success: ', success);
    }), function(err) {
      console.log('err: ', err);
    }
  }

})

angular.module('App.userprofile-triggerCtrl').controller('ModalInstanceTriggerCtrl', function ($scope, $uibModalInstance, $http, appFactory, $location, $state, userProfileFactory) {

  $scope.deviceData = [];
  $scope.userDevices = {};
  $scope.userInfo = {};

  $scope.updateDeviceTrigger = function(triggerName) {
    userProfileFactory.updateDeviceTrigger(triggerName).then(function(result){
      alert(result);
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
    var triggerResults = userProfileFactory.getTriggers();
    appFactory.getUser().then(function(result){
      $scope.userInfo = result.data;
      $scope.triggers = triggerResults.triggers;
    })
  }

  $scope.init();
});
