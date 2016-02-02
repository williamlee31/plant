angular.module('App.appCtrl',[])
	.controller('appCtrl', function($scope, $http, $location, appFactory){
		$scope.signout = function(){
			appFactory.signout();
		}

		$scope.init = function(){
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
