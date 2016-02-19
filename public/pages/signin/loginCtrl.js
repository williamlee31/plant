angular.module('App.loginCtrl',[
	])
	.controller('loginCtrl', function($scope, $http, $location, appFactory){
		$scope.login = function(){
			return $http({
				method: 'POST',
				url: 'api/users/signin',
				data: {
					username: $scope.user,
					password: $scope.pass
				}
			})
			.then(function(success){
				appFactory.user = success.data.username;
				appFactory.firstName = success.data.firstname;
				appFactory.lastName = success.data.lastname;
				appFactory.email = success.data.email;
				window.localStorage.setItem('token', success.data.token);
				$location.path('/app');
			}, function(err){
			})
		}
	})
