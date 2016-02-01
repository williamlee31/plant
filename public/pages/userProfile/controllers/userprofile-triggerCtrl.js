angular.module('App.userprofile-triggerCtrl',[
  ])
.controller('userprofile-triggerCtrl', function ($scope, $http){

  $scope.triggerm2xGET = function() {
    console.log('checking trigger...');
    var m2xKeys = {
      master: deviceMasterKey, // hide inside not pushed file
      device: deviceKey
    }
    return $http({
      method: 'GET',
      url: 'https://api-m2x.att.com/v2/devices/'+deviceKey+'/triggers',
      headers: {
        "X-M2X-KEY": m2xKeys.master
      }
    }).
    then(function(success) {
      console.log('success ', success);
    }), function(err) {
      console.log('err: ', err);
    }
  }

  $scope.triggerm2xPOST = function() {
    console.log('checking POST trigger...');
    var m2xKeys = {
      master: deviceMasterKey, // hide inside not pushed file
      device: deviceKey
    }

    return $http({
      method: "POST",
      url: 'https://api-m2x.att.com/v2/devices/'+deviceKey+'/triggers',
      headers: {
        "X-M2X-KEY": "7f4b3ddf06944e06a87d0cc8aef754ad"
      },
      data: { "name": "Low-Water",
      "conditions": {
        "water": { "changed": true }
      },
      "frequency": "continuous",
      "callback_url": "http://requestb.in/oftl8uof",
      "status": "enabled"
              // "send_location": false
            }
          }).
    then(function(success) {
      console.log('success: ', success);
    }), function(err) {
      console.log('err: ', err);
    }
  }





  $scope.array = [];
  $scope.array_ = angular.copy($scope.array);
  $scope.list = [{
    "id": 1,
    "value": "apple",
  }, {
    "id": 3,
    "value": "orange",
  }, {
    "id": 5,
    "value": "pear"
  }];

  $scope.update = function() {
    if ($scope.array.toString() !== $scope.array_.toString()) {
      return "Changed";
    } else {
      return "Not Changed";
    }
  }





})

  .directive("checkboxGroup", function() {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
                // Determine initial checked boxes
        if (scope.array.indexOf(scope.item.id) !== -1) {
          elem[0].checked = true;
        }

        // Update array on click
        elem.bind('click', function() {
          var index = scope.array.indexOf(scope.item.id);
            // Add if checked
            if (elem[0].checked) {
              if (index === -1) scope.array.push(scope.item.value);
            }
            // Remove if unchecked
            else {
              if (index !== -1) scope.array.splice(index, 1);
            }
            // Sort and update DOM display
            scope.$apply(scope.array.sort(function(a, b) {
              return a - b
            }));
          });
      }
    }
  });


