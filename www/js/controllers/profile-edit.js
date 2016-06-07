angular.module('donacion')
  .controller('ProfileEditController', function ($http, $scope, AuthService, ProfileService) {


    AuthService.isLogged(function () {
      $scope.datosDonante = ProfileService.getProfile().get();
    });
  });
