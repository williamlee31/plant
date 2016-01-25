angular.module('App',[
	])
	.factory('appFactory', function($window, $location){

		var signout = function(){
			console.log("INSIDE appFactory.signout");
			$window.localStorage.removeItem('token');
			$location.path('/signin');
		};

		var isAuth = function(){
			return $http({
				method: 'GET',
				url: '/api/users/auth',
				data: {
					token: $window.localStorage.token
				}
			}).then(function(success){
				return true; //true or false
			}, function(err){
				return false;
			})
		};
		
		return {
			signout: signout,
			isAuth: isAuth
		}

	})