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
				$state.get('userprofile').authenticate = true;
				window.localStorage.removeItem('token');
				$state.go('home');
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
        return success;
      }, function(err){
        console.log('User not loaded');
        return false;
      })
    };

    var welcomeEmail = function(firstname, email) {
      console.log('Trying to send welcome msg for: ' + firstname + ' ' + email)
      return $http({
        method: 'POST',
        url: 'notifications/welcome',
        data: {
          firstname: firstname,
          email: email
        }
      }).then(function(success){
        console.log('Welcome email sent to ' + email)
        return success;
      }, function(err){
        console.log('Welcome email not sent!')
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
