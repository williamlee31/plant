angular.module('App.userprofile-profileInfoCtrl',[
	])
	.controller('userprofile-profileInfoCtrl', function($scope, appFactory){
		$scope.userInfo = {};
		$scope.image = {};

		$scope.init = function(){
			appFactory.getUser().then(function(results){
			  $scope.image = {
				  src: '../../img/stockUsers/genericUser.png',
			  };
				$scope.userInfo = results.data;

  		})
		}
  	
  	$scope.init()
	})
