angular.module('appFactory', [])
	.factory('appFactory', function($location, $http, $state){
		var user = '';
		var firstName = '';
		var lastName = '';
		var email = '';

		var isAuth = function(){
			console.log('+++line10: inside isAuth');
			return $http({
				method: 'GET',
				url: '/api/users/auth',
				params: {
					token: window.localStorage.token
				}
			}).then(function(success){
				console.log('+++line19: inside appFactory success: ', success);
				return true; //true or false
			}, function(err){
				console.log('+++line21: inside appFactory err: ', err);
				return false;
			})
		};

		var signout = function(){
			return $http({
				method: 'GET',
				url: '/api/users/logout',
				params: {
					token: window.localStorage.token
				}
			}).then(function(success){
				$state.get('app').authenticate = true;
				$state.get('userprofile').authenticate = true;
				window.localStorage.removeItem('token');
				$location.path('/signin');
			}, function(err){
				console.log(err);
			})
		};

		var getUser = function() {
		return $http({
        	method: 'GET',
        	url: '/api/users',
        	params: {
          		token: window.localStorage.token
        	}
      	}).then(function(success){
				console.log('+++line50: ', success);
				firstName = success.firstname;
				console.log(success.firstname);
				console.log(firstName);
				return success;
      		}, function(err){
        		console.log('User not loaded');
        		return false;
      		})
		}

		// ,
		// 	user: user,
		// 	firstName: firstName,
		// 	lastName: lastName,
		// 	email: email

		return {
			isAuth: isAuth,
			signout: signout,
			getUser: getUser,
			firstname: firstName
		}
	})
