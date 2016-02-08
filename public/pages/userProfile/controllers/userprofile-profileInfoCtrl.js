angular.module('App.userprofile-profileInfoCtrl',[
	])
	.controller('userprofile-profileInfoCtrl', function($scope, appFactory){
		$scope.userInfo = {};
		$scope.image = {};

		$scope.init = function(){
			appFactory.getUser().then(function(results){
				results.data.firstname = results.data.firstname.charAt(0).toUpperCase() + results.data.firstname.slice(1);

				results.data.lastname = results.data.lastname.charAt(0).toUpperCase() + results.data.lastname.slice(1);

				$scope.userInfo = results.data;

  		})
		}

  	$scope.init()
	})
