angular.module('donacion')
  .controller('DireccionController', function ($scope, $uibModalInstance, ProfileService, DireccionesService, donante) {

    // Según la provincia elegida obtengo sus localidades.
    $scope.obtenerLocalidades = function(idprov) {
      $scope.localidades = DireccionesService.getLocalidades(idprov).query();
    };

    // Obtengo las provincias de la API.
    $scope.provincias = DireccionesService.getProvincias().query();

    if (donante.direccion) {
      $scope.donante = donante;
      $scope.localidades = DireccionesService.getLocalidades($scope.donante.direccion.localidad.provincia).query();
    } else {
      $scope.donante = {};
    }
    $scope.updateDireccion = function() {
      ProfileService.updateDireccion($scope.donante.direccion).then(function () {
        $uibModalInstance.close();
      });
    };

    $scope.close = function () {
      $uibModalInstance.dismiss('cerrar');
    };

  });
