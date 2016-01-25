angular.module('App',[
	'ui.router',
	'ngMessages',
	'App.loginCtrl',
	'App.signupCtrl',
	'App.deviceregisterCtrl',
	'App.appCtrl'
	])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('signin',{
				url: '/signin',
				templateUrl: 'templates/login.html',
				controller: 'loginCtrl'
			})
			.state('signup',{
				url: '/signup',
				templateUrl: 'templates/signup.html',
				controller: 'signupCtrl'
			})
			.state('app',{
				url: '/app',
				templateUrl: 'templates/app.html'
			})
			.state('userprofile',{
				url: '/userprofile',
				templateUrl: 'templates/userprofile.html'
			})
			.state('userprofile-register', {
				url: '/userprofile-register',
				templateUrl: 'templates/userprofile-register.html'
			})
			.state('deviceregister', {
				url: '/deviceregister',
				templateUrl: 'templates/deviceregister.html',
				controller: 'deviceregisterCtrl'
			});
		$urlRouterProvider
			.otherwise('/signin');
	})