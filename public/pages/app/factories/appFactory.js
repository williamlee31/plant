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
					username: this.user,
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
				this.user = null;
				this.firstName = null;
				this.lastName = null;
				this.email = null;
				$state.get('app').authenticate = true;
				$state.get('userprofile').authenticate = true;
				$state.get('deviceregister').authenticate = true;
				window.localStorage.removeItem('token');
				$location.path('/signin');
			}, function(err){
				console.log(err);
			})
		};

		return {
			isAuth: isAuth,
			signout: signout,
			user: user,
			firstName: firstName,
			lastName: lastName,
			email: email
		}
	})
