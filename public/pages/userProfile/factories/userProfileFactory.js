angular.module('userProfileFactory', [])
	.factory('userProfileFactory', function($location, $http, $state){

    var checkDevices = function(username) {
      console.log('Checking for devices');
      return $http({
        method: 'GET',
        url: '/api/devices',
        params: {
          username: username
        }
      })
      .then(function(success){
        return success;
      }, function(err){
        console.log("Device not retrieved");
      })
    }

    var deleteDevice = function(deviceName, username) {
      return $http({
        method: 'DELETE',
        url: '/api/devices',
        headers: {"Content-Type": "application/json;charset=utf-8"},
        data: {
          username: username,
          devicename: deviceName,
        }
      })
      .then(function(dbResponse){
        if(dbResponse.status === 200){
          alert('Deleted ' + deviceName + ' from your profile');
          console.log('Device deleted');
          return true;
        }
      }, function(err){
        console.log('Device not deleted');
        return false;
      })
    }

		return {
      checkDevices: checkDevices,
      deleteDevice: deleteDevice
		}
	})
