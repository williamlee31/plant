angular.module('userProfileFactory', [])
	.factory('userProfileFactory', function($location, $http, $state){

    var user = '';
    var firstName = '';
    var lastName = '';
    var email = '';

    var isAuth = function(){
      console.log('+++line10: inside isAuth');
      return $http({
        method: 'GET',
        url: '/api/users/auth',
        params: {
          token: window.localStorage.token
        }
      }).then(function(success){
        console.log('+++line19: inside userProfileFactory success: ', success);
        return true; //true or false
      }, function(err){
        console.log('+++line21: inside userProfileFactory err: ', err);
        return false;
      })
    };

    var signout = function(){
      return $http({
        method: 'GET',
        url: '/api/users/logout',
        params: {
          token: window.localStorage.token
        }
      }).then(function(success){
        $state.get('app').authenticate = true;
        $state.get('userprofile').authenticate = true;
        window.localStorage.removeItem('token');
        $location.path('/signin');
      }, function(err){
        console.log(err);
      })
    };

    var getUser = function() {
      return $http({
        method: 'GET',
        url: '/api/users',
        params: {
          token: window.localStorage.token
        }
      }).then(function(success){
        console.log('+++line50: ', success);
        return success;
      }, function(err){
        console.log('User not loaded');
      })
    }


    var currentDevice = {};

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
        console.log("CHECK DEVICES---LINE 71 --- success:", success);
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

    var assignCurrentDevice = function(deviceName, apiKey){
      currentDevice.deviceName = deviceName;
      currentDevice.apiKey = apiKey;
      console.log('******* HERE HERE HERE: ', apiKey)
    }

    var getChartData = function(stream){
      if(currentDevice.apiKey){
        var m2xKeys = {
          master: deviceMasterKey,
          device: currentDevice.apiKey
        }
        return $http({
          method: 'GET',
          url: 'https://api-m2x.att.com/v2/devices/'+m2xKeys.device+'/streams/'+stream+'/values?limit=10000&pretty',
          headers: {
            "X-M2X-KEY": m2xKeys.master
          }
          // params: {
          //   start: ,
          //   end: ,
          //   limit: 30
          // }
        })
        .then(function(success){
          return success;
        }, function(err){
          console.log("Data not retrieved");
        })
      }
    }

    return {
      isAuth: isAuth,
      signout: signout,
      getUser: getUser,
      user: user,
      firstName: firstName,
      lastName: lastName,
      email: email,
      checkDevices: checkDevices,
      deleteDevice: deleteDevice,
      assignCurrentDevice: assignCurrentDevice,
      getChartData: getChartData
    }
  })
