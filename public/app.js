angular.module('App',[
	'ui.router',
	'ngMessages',
	'App.appCtrl',
	'App.homeCtrl',
	'App.loginCtrl',
	'App.signupCtrl',
	'App.userProfileCtrl',
	'App.userprofile-registerCtrl',
	'App.userprofile-profileInfoCtrl',
	'App.userprofile-chartsCtrl',
	'App.productpageCtrl',
	'App.userprofile-triggerCtrl',
	'appFactory',
	'userProfileFactory',
	'ui.bootstrap',
	'ngAnimate',
	'ngMaterial',
	'duScroll'
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
			.state('home',{
				url: '/',
				authenticate: false,
				views: {
					'': {
						templateUrl: 'pages/home/home.html',
						controller: 'homeCtrl'
					}
				}
			})
			.state('signin',{
				url: '/signin',
				authenticate: false,
				views: {
					'': {
						templateUrl: 'pages/signin/login.html',
						controller: 'loginCtrl'
					}
				}
			})
			.state('signup',{
				url: '/signup',
				authenticate: false,
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
						controller: 'userProfileCtrl'
					},
					'register@userprofile': {
						templateUrl: 'pages/userProfile/templates/userprofile-register.html',
						controller: 'userprofile-registerCtrl'
					},
					'profileInfo@userprofile': {
						templateUrl: 'pages/userProfile/templates/userprofile-profileInfo.html',
						controller: 'userprofile-profileInfoCtrl'
					},
					'charts@userprofile': {
						templateUrl: 'pages/userProfile/templates/userprofile-charts.html',
						controller: 'userprofile-chartsCtrl'
					},
					'trigger@userprofile': {
						templateUrl: 'pages/userProfile/templates/userprofile-trigger.html',
						controller: 'userprofile-triggerCtrl'
					}							
				}
			})
			.state('productpage', {
				url: '/productpage',
				authenticate: false,
				views: {
					'': {
						templateUrl: 'pages/productPage/productpage.html',
						controller: 'productpageCtrl'
					}
				}
			})

		$urlRouterProvider
			.otherwise('/');
	})
	.run(function($rootScope, $state, appFactory, $location) {
	  $rootScope.$on('$stateChangeStart', function(e, to) {
			console.log('+++line116: ', to.authenticate);
	    if (!to.authenticate) {
				return;
			};
			e.preventDefault();
			appFactory.isAuth($state).then(function(result){
				console.log('+++line78: result', result);
				if(result){
					to.authenticate = false;
					$state.go(to.name);
				}else{
					$location.path('/signin');
				}
			})
	  });
	})
