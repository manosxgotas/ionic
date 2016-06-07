angular.module('donacion')
  .controller('LoginController', function ($http, $scope, AuthService) {

      $scope.credentials = {};

      $scope.login = function() {
        AuthService.login($scope.credentials);
      }

  });
