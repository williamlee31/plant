angular.module('App.productpageCtrl',[
	])
	.controller('productpageCtrl', function($scope, $location){
	  $scope.image = {
		  src: '../img/productPage3dObj.png',
	  };

	  $scope.routeProfile = function(){
	  	console.log('+++line9: inside routeProfile function');
	  	$location.path('/userprofile');
	  }
	})
