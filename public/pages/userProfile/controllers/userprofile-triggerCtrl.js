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
