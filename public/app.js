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
				templateUrl: 'templates/app.html',
				controller: 'appCtrl'
			})
			.state('userprofile',{
				url: '/userprofile',
				templateUrl: 'templates/userprofile.html',
				controller: 'userprofileCtrl'
			})
			.state('userprofile-register', {
				url: '/userprofile-register',
				templateUrl: 'templates/userprofile-register.html',
				controller: 'userprofile-registerCtrl'
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
				controller: 'deviceregisterCtrl'
			});
		$urlRouterProvider
			.otherwise('/signin');
	})



	// .run(function($rootScope, $location, $state){
	// 	$rootScope.$on('$stateChangeStart', function(event, next, current, appFactory){
			
	// 		if(!window.localStorage.token){
	// 			console.log("YOU ARE NOT LOGGED IN!");
	// 			$location.path('/login');
	// 		}

			


	// 		// return $q(function(resolve, reject){




	// 		// 	if(!window.localStorage.token){

	// 		// 	}
	// 		// })

	// 		// if(next)

	// 		// var auth = false;
	// 		// var auth = appFactory.isAuth();

	// 		// console.log("auth:", auth);
	// 		console.log("Event:", event);
	// 		console.log("next:", next);
	// 		console.log("current:", current);
	// 		console.log("INSIDE RUN!!!!!!!");
	// 		console.log("next.authenticate", next.authenticate);
	// 		// console.log("appFactory", appFactory);
	// 		// console.log(Boolean(appFactory.isAuth()));
	// 		// console.log(auth);

	// 	});
	// })
