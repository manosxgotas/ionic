angular.module('donacion')
  .controller('RegistrarDonacionController', function ($http, $scope, AuthService, ProfileService, DonacionesService, CentrosDonacionService, EventosService) {

    $scope.DPOptions = {
      maxDate: new Date()
    };

    AuthService.isLogged(function () {

      $scope.donacion = {};

      $scope.perfil = ProfileService.getProfile().get();

      $scope.centros = CentrosDonacionService.query();

      $scope.eventos = EventosService.query();

      $scope.registrarDonacion = function(foto) {
        if (foto != undefined) {
          DonacionesService.registrarDonacion($scope.donacion, $scope.perfil.registro.id, foto.file);
        } else {
          DonacionesService.registrarDonacion($scope.donacion, $scope.perfil.registro.id);
        }
      }
    });
  });
