angular.module('donacion')
  .controller('ProfileEditController', function ($http, $scope, AuthService, ProfileService, DireccionesService) {

    AuthService.isLogged(function () {

      // Obtengo las provincias de la API.
      $scope.provincias = DireccionesService.getProvincias().query();

      // Según la provincia elegida obtengo sus localidades.
      $scope.obtenerLocalidades = function(idprov) {
        $scope.localidades = DireccionesService.getLocalidades(idprov).query();
      };

      $scope.datosDonante = ProfileService.getProfile().get({}, function () {

        $scope.localidades = DireccionesService.getLocalidades($scope.datosDonante.direccion.localidad.provincia).query();

      });

      $scope.update = function () {
        ProfileService.updateProfile($scope.datosDonante);
      }
    });
  });
