angular.module('App',[
	'ui.router',
	'ngMessages',
	'App.loginCtrl',
	'App.signupCtrl',
	'App.deviceregisterCtrl',
	'App.userprofileCtrl',
	'App.appCtrl',
	'App.productpageCtrl',
	'appFactory'
	])
	.config(function($stateProvider, $urlRouterProvider,  $httpProvider){
		$stateProvider
			.state('signin',{
				url: '/signin',
				templateUrl: 'pages/signin/login.html',
				controller: 'loginCtrl'
			})
			.state('signup',{
				url: '/signup',
				templateUrl: 'pages/signup/signup.html',
				controller: 'signupCtrl'
			})
			.state('app',{
				url: '/app',
				templateUrl: 'pages/app/app.html',
				controller: 'appCtrl',
				authenticate: true
			})
			.state('userprofile',{
				url: '/userprofile',
				templateUrl: 'pages/userProfile/userprofile.html',
				controller: 'userprofileCtrl',
				authenticate: true
			})
			.state('productpage', {
				url: '/productpage',
				views: {
					'': {
						templateUrl: 'pages/productPage/productpage.html',
						controller: 'productpageCtrl'
					}
				}
			})
			.state('deviceregister', {
				url: '/deviceregister',
				templateUrl: 'pages/deviceRegister/deviceregister.html',
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
