angular.module('App.signupCtrl',[
	])
	.controller('signupCtrl', function($scope, $http, $location){

		$scope.signup = function(){
			console.log("INSIDE LOGIN!");
			console.log($scope.user, $scope.pass, $scope.email);
			return $http({
				method: 'POST',
				url: 'api/users/signup',
				data: {
					firstname: $scope.firstname,
					lastname: $scope.lastname,
					username: $scope.user,
					password: $scope.pass,
					email: $scope.email,
				}
			})
			.then(function(success){
				console.log("Inside Success within Signup()");
				console.log("success", success);
				window.localStorage.setItem('token', success.data.token);
				$location.path('/app');
			}, function(err){
				console.log("INCORRECT LOGIN");
			})
		}
	})
