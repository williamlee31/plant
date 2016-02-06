angular.module('App.homeCtrl', ['ngAnimate', 'ui.bootstrap', 'ngMaterial']);
angular.module('App.homeCtrl').controller('homeCtrl', function ($scope, $uibModal, $log, $http, $location, appFactory, $anchorScroll, $window, $filter) {

  $filter('lowercase')();

  $(document).on('scroll', function (e) {
    console.log("SCROLL JQUERY");
    console.log(document.body.scrollTop);

    var r = 255 - $(document).scrollTop();
    var g = 255 - $(document).scrollTop();
    var b = 255 - $(document).scrollTop();
    var marg = 80 - $(document).scrollTop();
    var font = 160 - ($(document).scrollTop() * 1.619);


    if($(document).scrollTop() > 126){ r = 129;}
    if($(document).scrollTop() > 89){ g = 166;}
    if($(document).scrollTop() > 220){b = 35;}
    if($(document).scrollTop() > 71){font = 45;}
    if($(document).scrollTop() > 71){marg = 9;} 

    $('.navBarBackground').css('opacity', ($(document).scrollTop() / 300));
    $('.navbarLogo').css('color', "rgb(" + r + "," + g + "," + b +")");
    $('.navBarText').css('color', "rgb(" + r + "," + g + "," + b +")");
    $('.navbarLogo').css('margin-top', marg);
    $('.navbarLogo').css('font-size', font);

  });

  $scope.scrollTo = function(id){
    $location.hash(id);
    $anchorScroll();
  }

  $scope.animationsEnabled = true;
  
  
  $scope.userInfo = {};
  $scope.firstName = "";
  $scope.isLoggedIn = false;
  
  $scope.init = function(){
    appFactory.getUser().then(function(result){
      if(result){
        console.log(result.data);
        $scope.userInfo = result.data;
        $scope.firstname = result.data.firstname;
        // $scope.firstname = $scope.userInfo.firstname;
        // $scope.firstname = $scope.firstname.toUpperCase();
        console.log("scope.userInfo.firstname", $scope.firstname);
        console.log("scope.userInfo.firstname", result.data.firstname.toUpperCase());
        $scope.isLoggedIn = true;
      }
    })
  }

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

  $scope.init();

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
        // $scope.cancel();
        $uibModalStack.dismissAll();
        $scope.userInfo = success.data;
        window.localStorage.setItem('token', success.data.token);
        $location.path('/userprofile');
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
        // $scope.cancel();
        // $uibModalStack.dismissAll();
        console.log("Inside Success within Signup()");
        $scope.userInfo = success.data;
        window.localStorage.setItem('token', success.data.token);
        $location.path('/userprofile');
      }, function(err){
        console.log("INCORRECT SIGNUP");
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