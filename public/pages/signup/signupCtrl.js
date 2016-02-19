angular.module('App.signupCtrl',[
	])
	.controller('signupCtrl', function($scope, $http, $location, appFactory){

		$scope.signup = function(){
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
				appFactory.user = success.data.username;
				appFactory.firstName = success.data.firstname;
				appFactory.lastName = success.data.lastname;
				appFactory.email = success.data.email;
        appFactory.welcomeEmail(success.data.firstname, success.data.email).then(function(success){
        });
				window.localStorage.setItem('token', success.data.token);
				$location.path('/app');
			}, function(err){
			})
		}

	})
