angular.module('donacion')
  .controller('RegistrarDonacionController', function ($http, $scope, AuthService, ProfileService, DonacionesService) {

    $scope.DPOptions = {
      maxDate: new Date()
    };

    AuthService.isLogged(function () {

      $scope.donacion = {};

      $scope.perfil = ProfileService.getProfile().get();

      $scope.registrarDonacion = function(foto) {
        if (foto != undefined) {
          DonacionesService.registrarDonacion($scope.donacion, $scope.perfil.registro.id, foto.file);
        } else {
          DonacionesService.registrarDonacion($scope.donacion, $scope.perfil.registro.id);
        }
      }
    });
  });
