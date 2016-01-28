angular.module('App',[
	'ui.router',
	'ngMessages',
	'App.loginCtrl',
	'App.signupCtrl',
	'App.userprofileCtrl',
	'App.userprofile-registerCtrl',
	'App.appCtrl',
	'App.productpageCtrl',
	'App.profileInfoCtrl',
	'appFactory'
	])
	.config(function($stateProvider, $urlRouterProvider,  $httpProvider){
		//  how to do controller/view (DON'T forget to add controller to angular.model & index.html)
		// .state('app',{
		// 	url: '/app',
		// 	authenticate: true,
		// 	views: {
		// 		'': {
		// 			templateUrl: 'pages/app/app.html',
		// 			controller: 'appCtSrl'
		// 		},
		// 		example for nest view/ controller
		// 		'<YOUR VIEW NAME>@app': {
		// 			template: 'pages/app/templates/<YOUR VIEW NAME>.html',
		// 			controller: '<YOUR CONTROLLER NAME>'
		// 		}
		// 	}					
		// })
		// ---Add this to the parent view template---
		// <div ui-view="<YOUR VIEW NAME>"></div>
		$stateProvider
			.state('signin',{
				url: '/signin',
				views: {
					'': {
						templateUrl: 'pages/signin/login.html',
						controller: 'loginCtrl'
					}
				}
			})
			.state('signup',{
				url: '/signup',
				views: {
					'': {
						templateUrl: 'pages/signup/signup.html',
						controller: 'signupCtrl'
					}
				}				
			})
			.state('app',{
				url: '/app',
				authenticate: true,
				views: {
					'': {
						templateUrl: 'pages/app/app.html',
						controller: 'appCtrl'
					}
				}					
			})
			.state('userprofile',{
				url: '/userprofile',
				authenticate: true,
				views: {
					'': {
						templateUrl: 'pages/userProfile/userprofile.html',
						controller: 'userprofileCtrl'
					},
					'register@userprofile': {
						templateUrl: 'pages/userProfile/templates/userprofile-register.html',
						controller: 'userprofile-registerCtrl'
					},
					'profileInfo@userprofile': {
						templateUrl: 'pages/userProfile/templates/profileInfo.html',
						controller: 'profileInfoCtrl'
					}
				}				
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
			// .state('deviceregister', {
			// 	url: '/deviceregister',
			// 	authenticate: true,
			// 	views: {
			// 		'': {
			// 			templateUrl: 'pages/deviceRegister/deviceregister.html',
			// 			controller: 'deviceregisterCtrl'
			// 		}
			// 	}				
			// });

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
