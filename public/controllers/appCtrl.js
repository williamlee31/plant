angular.module('App.appCtrl',[])
	.controller('appCtrl', function($scope, $http, $location, appFactory){

		console.log("APPFACTORY", appFactory);

		$scope.signout = function(){
			return $http({
				method: 'GET',
				url: '/api/users/logout',
				params: {
					token: window.localStorage.token
				}
			}).then(function(success){
				appFactory.user = null;
				appFactory.firstName = null;
				appFactory.lastName = null;
				appFactory.email = null;
				window.localStorage.removeItem('token');
				$location.path('/signin');
			}, function(err){
				console.log(err);
			})
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
