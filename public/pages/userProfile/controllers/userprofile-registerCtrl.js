angular.module('App.userprofile-registerCtrl',['ngAnimate', 'ui.bootstrap'
  ])
.controller('userprofile-registerCtrl', function ($scope, $http, $uibModal, $log){


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


angular.module('App.userprofile-registerCtrl').controller('ModalInstanceRegCtrl', function ($scope, $uibModalInstance, $http, appFactory, $location) {
    
  $scope.deviceData = {};
  $scope.device = {};
  $scope.username;

  $scope.errorMessage = '';

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
          $scope.addDeviceAlert = true;
          // alert('Added ' + $scope.device.name + ' to your profile')
          console.log('Device registered!!');
        }
      }, function(err){
        // alert('Device already registered');
        console.log('err: ', err);
        $scope.registeredAlert = true;
        // if ($scope.invalidDeviceAlert == true) {
        //   $scope.toggleAlertRA();
        // }
      })
    }, function(err){
      // alert('You done goofed!');
      console.log('err: ', err);
        $scope.invalidDeviceAlert = true;
      // if ($scope.registeredAlert === true) {
      //   $scope.toggleAlertID();
      // }
      // $scope.errorMessage = 'You done goofed bro! test';
      // inform user of incorrect key
    })
  }

  $scope.invalidDeviceAlert = false;
  $scope.toggleAlertID = function() {
    $scope.registeredAlert = false;
    $scope.invalidDeviceAlert = true
  };

  $scope.registeredAlert = false;
  $scope.toggleAlertRA = function() {
    $scope.invalidDeviceAlert = false;
    $scope.registeredAlert = true;
  };

  $scope.addDeviceAlert = false;
  $scope.toggleAlertDA = function() {
    $scope.invalidDeviceAlert = false;
    $scope.registeredAlert = false;
  };

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


  $scope.showModal = false;
  $scope.toggleModal = function() {
    $scope.invalidDeviceAlert = false;
    $scope.registeredAlert = false;
    $scope.showModal = !$scope.showModal;

  };  


  $scope.signInTrue = true;

  $scope.signInUpToggle = function(){
    $scope.signInTrue = !$scope.signInTrue;
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    // $uibModalStack.dismissAll();
  };

  $scope.ok = function () {
    // $uibModalInstance.close($scope.selected.item);
    $uibModalInstance.close('ok');
  };

})









////////////////////////////////////////////////////bootstrap Css
  // .directive('modal', function () {
  //   return {
  //     template: '<div class="modal fade">' + 
  //         '<div class="modal-dialog">' + 
  //           '<div class="modal-content">' + 
  //             '<div class="modal-header">' + 
  //               '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
  //               '<h4 class="modal-title">{{ title }}</h4>' + 
  //             '</div>' + 
  //             '<div class="modal-body" ng-transclude></div>' + 
  //           '</div>' + 
  //         '</div>' + 
  //       '</div>',
  //     restrict: 'E',
  //     transclude: true,
  //     replace:true,
  //     scope:true,
  //     link: function postLink(scope, element, attrs) {
  //       scope.title = attrs.title;

  //       scope.$watch(attrs.visible, function(value){
  //         if(value == true)
  //           $(element).modal('show');
  //         else
  //           $(element).modal('hide');
  //       });

  //       $(element).on('shown.bs.modal', function(){
  //         scope.$apply(function(){
  //           scope.$parent[attrs.visible] = true;
  //         });
  //       });

  //       $(element).on('hidden.bs.modal', function(){
  //         scope.$apply(function(){
  //           scope.$parent[attrs.visible] = false;
  //         });
  //       });
  //     }
  //   };
  // });