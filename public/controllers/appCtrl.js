angular.module('App.appCtrl',[
	])
	.controller('appCtrl', function($scope, $http, $location){
		$scope.signout = function(){
			console.log("INSIDE appFactory.signout");
			window.localStorage.removeItem('token');
			$location.path('api/users/signin');
		};
		
	})