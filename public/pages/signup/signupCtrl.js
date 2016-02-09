angular.module('App.signupCtrl',[
	])
	.controller('signupCtrl', function($scope, $http, $location, appFactory){

		console.log("INSIDE SIGNUP controller");


		$scope.signup = function(){
			console.log(appFactory);
			console.log("INSIDE Signup!");
			console.log($scope.user, $scope.pass, $scope.email);
			// console.log("appFactory.user", appFactory.user);
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
				console.log("Inside Success within Signup()");
				appFactory.user = success.data.username;
				appFactory.firstName = success.data.firstname;
				appFactory.lastName = success.data.lastname;
				appFactory.email = success.data.email;
        appFactory.welcomeEmail(success.data.firstname, success.data.email).then(function(success){
          console.log('Welcome email sent to ' + success.data.firstname)
        });
				window.localStorage.setItem('token', success.data.token);
				console.log("******SIGNUP before LOCATION PATH CHANGE*******");
				console.log("appFactory.user:",appFactory.user,"appFactory.lastName", appFactory.lastName, "appFactory.firstName", appFactory.firstName, "appFactory.email", appFactory.email);
				$location.path('/app');
			}, function(err){
				console.log("INCORRECT LOGIN");
			})
		}

	})
