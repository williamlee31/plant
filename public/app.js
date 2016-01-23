angular.module('App',[
	'ui.router',
	'ngMessages',
	'App.loginCtrl',
	'App.signupCtrl'
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
			})
			.state('app',{
				url: '/app',
				templateUrl: 'templates/app.html'
			});
		$urlRouterProvider
			.otherwise('/signin');
	})