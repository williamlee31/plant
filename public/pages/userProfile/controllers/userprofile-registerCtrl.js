angular.module('App.userprofile-registerCtrl',[
  ])
.controller('userprofile-registerCtrl', function($scope, $http){

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


  $scope.showModal = false;
  $scope.toggleModal = function() {
    $scope.showModal = !$scope.showModal;
  };      
})

  .directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });