angular.module('App.appCtrl',[])
	.controller('appCtrl', function($scope, $http, $location, appFactory){


		$scope.signout = function(){
			console.log("INSIDE appFactory.signout");
			window.localStorage.removeItem('token');
			$location.path('api/users/signin');
		};

		console.log(appFactory);
		
		$scope.init = function(){
			console.log("LOCAL STORAGE!!!!!!!#E@#$", window.localStorage.token)
			return $http({
				method: 'GET',
				url: '/api/users',
				params: {
					token: window.localStorage.token
				}
			}).then(function(success){
				console.log(success, success.data.username, "SUCCESS!!!");
				appFactory.user = success.data.username;
				appFactory.firstName = success.data.firstname;
				appFactory.lastName = success.data.lastname; //true or false
				appFactory.email = success.data.email;
				$scope.usernamewelcome = appFactory.user;
				console.log("APPFACTORY.USER!", appFactory.user);
			}, function(err){
				console.log("INIT ERROR!!!", err);
			})
		};

		$scope.init();
	})