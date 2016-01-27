angular.module('App',[
	'ui.router',
	'ngMessages',
	'App.loginCtrl',
	'App.signupCtrl',
	'App.deviceregisterCtrl',
	'App.userprofileCtrl',
	'App.appCtrl',
	'appFactory',
	'App.productpageCtrl',
	'App.userprofile-registerCtrl'
	])
	.config(function($stateProvider, $urlRouterProvider,  $httpProvider){
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
				templateUrl: 'templates/app.html',
				controller: 'appCtrl',
				authenticate: true
			})
			.state('userprofile',{
				url: '/userprofile',
				templateUrl: 'templates/userprofile.html',
				controller: 'userprofileCtrl',
				authenticate: true
			})
			.state('userprofile-register', {
				url: '/userprofile-register',
				templateUrl: 'templates/userprofile-register.html',
				controller: 'userprofile-registerCtrl',
				authenticate: true
			})
			.state('userprofile-register.info', {
				url: '/info',
				templateUrl: 'templates/userprofile-register-info.html',
				controller: function($scope) {
					$scope.elements = ['temperature', 'moisture', 'light'];
				}
			})
			.state('productpage', {
				url: '/productpage',
				views: {
					'': {
						templateUrl: 'templates/productpage.html',
						  controller: 'productpageCtrl'
					},
					'register@productpage': {
						templateUrl: 'templates/userprofile-register.html'
					}
				}
			})
			.state('deviceregister', {
				url: '/deviceregister',
				templateUrl: 'templates/deviceregister.html',
				controller: 'deviceregisterCtrl',
				authenticate: true
			});
		$urlRouterProvider
			.otherwise('/signin');
	})
	.run(function($rootScope, $state, appFactory, $location) {
	  $rootScope.$on('$stateChangeStart', function(e, to) {
	    if (!to.authenticate) {
				return;
			};
			e.preventDefault();
			var response = appFactory.isAuth()
			response.then(function(result){
				console.log('+++line78: result', result);
				if(result){
					// debugger;
					to.authenticate = false;
					$location.path(to.url);
				}else{
					$location.path('/signin');
				}
			})
	  });
	})
