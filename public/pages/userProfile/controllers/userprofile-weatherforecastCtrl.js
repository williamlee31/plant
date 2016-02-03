angular.module('App.userprofile-weatherforecastCtrl',['ngAnimate', 'ui.bootstrap'
  ])
.controller('userprofile-weatherforecastCtrl', function ($scope, $http, userProfileFactory){
	$scope.zipcode;
	$scope.weather = "";
	$scope.displayForecast = function(){
		userProfileFactory.weatherForecast($scope.zipcode)
		.then(function(results){
			var response = results.data.forecast.simpleforecast.forecastday;
			console.log("+++++ line 9: ", response)
			for(var i=0; i < 7; i++){
				var conditions = response[i].conditions.split(' ');
				for(var j=0; j < conditions.length; j++){
					if(conditions[j] === "Rain"){
						if(i === 0){
							$scope.weather += "Chance of rain on: " + response[i].date.weekday_short;	
						} else{
							$scope.weather += " " + response[i].date.weekday_short;
						}
					}
				}
			}
		})
	}
  $scope.init = function(){

  }
  
  $scope.init()


})
