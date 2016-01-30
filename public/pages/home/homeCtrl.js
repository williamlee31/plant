angular.module('App.homeCtrl', ['ngAnimate', 'ui.bootstrap']);
angular.module('App.homeCtrl').controller('homeCtrl', function ($scope, $uibModal, $log, $http, $location, appFactory, $anchorScroll, $window) {



  //opactiy = 0 // top of page
  //
  //opacity = 1 //end of pic (hardcoded around 700 px; otherwise get height of main image)

  // if scrollY > 700px // then opacity = 1
  // if scrollY < 700px // then opacity = (700 - ScrollY)/ 700

  $(document).on('scroll', function (e) {
    console.log("SCROLL JQUERY");
    console.log(document.body.scrollTop);
    $('.navBarBackground').css('opacity', ($(document).scrollTop() / 500));
  });

  $scope.scrollTo = function(id){
    $location.hash(id);
    $anchorScroll();
  }

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});

angular.module('App.homeCtrl').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $uibModalStack, $http, appFactory, $location) {
    
  $scope.signInTrue = true;

  $scope.login = function(){
    console.log("+++Line 52 modal.js Inside LOGIN!");
    console.log("+++Line 53 modal.js Login: $scope.userLogin", $scope.userLogin, "$scope.passLogin", $scope.passLogin );
    return $http({
        method: 'POST',
        url: 'api/users/signin',
        data: {
          username: $scope.userLogin,
          password: $scope.passLogin
        }
      })
      .then(function(success){
        console.log($scope.cancel);
        console.log(success);
        appFactory.user = success.data.username;
        appFactory.firstName = success.data.firstname;
        appFactory.lastName = success.data.lastname;
        appFactory.email = success.data.email;
        window.localStorage.setItem('token', success.data.token);
        $location.path('/app');
      }, function(err){
        console.log("INCORRECT LOGIN");
      })

  }

  $scope.signup = function(){
    // console.log("SIGNUP WORKS!!");
    console.log("firstname:", $scope.firstname,
        "lastname:", $scope.lastname,
        "username:", $scope.user,
        "password:", $scope.pass,
        "email:", $scope.email);
    return $http({
        method: 'POST',
        url: 'api/users/signup',
        data: {
          firstname: $scope.firstname,
          lastname: $scope.lastname,
          username: $scope.user,
          password: $scope.pass,
          email: $scope.email
        }
      })
      .then(function(success){
        $scope.cancel();
        // $uibModalStack.dismissAll();
        console.log("Inside Success within Signup()");
        appFactory.user = success.data.username;
        appFactory.firstName = success.data.firstname;
        appFactory.lastName = success.data.lastname;
        appFactory.email = success.data.email;
        window.localStorage.setItem('token', success.data.token);
        console.log("******SIGNUP before LOCATION PATH CHANGE*******");
        console.log("appFactory.user:",appFactory.user,"appFactory.lastName", appFactory.lastName, "appFactory.firstName", appFactory.firstName, "appFactory.email", appFactory.email);
        $location.path('/app');
      }, function(err){
        console.log("INCORRECT LOGIN");
      })
  }



  $scope.signInUpToggle = function(){
    $scope.signInTrue = !$scope.signInTrue;
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
    // $uibModalStack.dismissAll();
  };
});

angular.module('App.homeCtrl').directive('scrollPosition', function($window){
  return {
    scope
  }
})