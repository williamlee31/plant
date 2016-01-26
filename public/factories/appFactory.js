angular.module('appFactory', [])
	.factory('appFactory', function($location, $http){

		var signout = function(){
			console.log("INSIDE appFactory.signout");
			window.localStorage.removeItem('token');
			$location.path('/signin');
		};

		var user = '';
		var firstName = '';
		var lastName = '';
		var email = '';


		// var init = function(){
		// 	console.log("LOCAL STORAGE!!!!!!!#E@#$", window.localStorage.token)
		// 	return $http({
		// 		method: 'GET',
		// 		url: '/api/users',
		// 		params: {
		// 			token: window.localStorage.token
		// 		}
		// 	}).then(function(success){
		// 		console.log(success, success.data.username);
		// 		appFactory.user = success.data.username;
		// 		appFactory.firstName = success.data.firstname;
		// 		appFactory.lastName = success.data.lastname; //true or false
		// 		appFactory.email = success.data.email;
		// 	}, function(err){
		// 		console.log("INIT ERROR!!!", err);
		// 	})
		// };

		var isAuth = function(){
			return $http({
				method: 'GET',
				url: '/api/users/auth',
				params: {
					username: user,
					token: window.localStorage.token
				}
			}).then(function(success){
				return true; //true or false
			}, function(err){
				return false;
			})
		};

		return {
			signout: signout,
			isAuth: isAuth,
			user: user,
			firstName: firstName,
			lastName: lastName,
			email: email
			// init: init
		}

	})
