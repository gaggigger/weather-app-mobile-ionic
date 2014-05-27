'use strict';
angular.module('IonicWeatherApp.controllers', ['ionic'])

.controller('DashCtrl', function($scope, $ionicLoading, $ionicModal) {
  $scope.hide = true;

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hide', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  $scope.add = function(cityName, stateName) {
    console.log(cityName + ', ' + stateName);
    $ionicLoading.show({
      content: 'Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ", " + stateName + "&mode=json&units=imperial",
        type: "get",
        dataType: "json",
        success: function (data) {
          $ionicLoading.hide();
          $scope.hide = false;
          console.log(data.main.temp);
          $scope.$apply(function() { //necessary to $apply the changes
            $scope.cityInfo = "Weather Info For " + cityName + ', ' + stateName + ":"
            $scope.temp = '' || "Temp: " + data.main.temp + " °F";
            $scope.highTemp = '' || "Hi: " + data.main.temp_max + " °F";
            $scope.lowTemp = '' || "Lo: " + data.main.temp_min + " °F";
            $scope.pressure = '' || "Pressure: " + data.main.pressure + " hPa";
            $scope.humidity = '' || "Humidity: " + data.main.humidity + " %";
          })
        },
        error: function(xhr, status) {
          console.log("Error: " + status);
        }
      });
  };

  $scope.clear = function() {
    $('input').val('');
  }
})

.controller('CityCtrl', function($scope, Cities) {
  $scope.cities = Cities.all();
});

// .controller('FriendsCtrl', function($scope, Friends) {
//   $scope.friends = Friends.all();
// })

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })

// .controller('AccountCtrl', function($scope) {
// });
