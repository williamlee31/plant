angular.module('appFactory', [])
	.factory('appFactory', function($location, $http, $state){
		var user = '';
		var firstName = '';
		var lastName = '';
		var email = '';

		var isAuth = function(){
			return $http({
				method: 'GET',
				url: '/api/users/auth',
				params: {
					token: window.localStorage.token
				}
			}).then(function(success){
				return true; //true or false
			}, function(err){
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
				$state.get('userprofile').authenticate = true;
				window.localStorage.removeItem('token');
				$state.go('home');
			}, function(err){
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
        firstName = success.firstname;
        return success;
      }, function(err){
        return false;
      })
    };

    var welcomeEmail = function(firstname, email) {
      return $http({
        method: 'POST',
        url: 'notifications/welcome',
        data: {
          firstname: firstname,
          email: email
        }
      }).then(function(success){
        return success;
      }, function(err){
      })
    };

		return {
			isAuth: isAuth,
			signout: signout,
			getUser: getUser,
      welcomeEmail: welcomeEmail,
			firstname: firstName
		}
	})
