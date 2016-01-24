angular.module('App.loginCtrl',[
	])
	.controller('loginCtrl', function($scope, $http, $location){

		$scope.login = function(){
			console.log("INSIDE LOGIN!");
			console.log($scope.user, $scope.pass);
			return $http({
				method: 'POST',
				url: 'api/users/signin',
				data: {
					username: $scope.user,
					password: $scope.pass
				}
			})
			.then(function(success){
				console.log(success);
				console.log("Inside Success within Login()");
				window.localStorage.setItem('token', success.data.token);
				$location.path('/app');
			}, function(err){
				console.log("INCORRECT LOGIN");
			})
		}
	})
