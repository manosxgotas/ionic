angular.module('donacion')
  .controller('EliminarDonacionController', function ($http, $scope, $uibModalInstance, DonacionesService, idDonacion) {

    $scope.eliminar = function () {
      DonacionesService.eliminarDonacion(idDonacion);
      $uibModalInstance.dismiss();
    };

    $scope.cerrarModal = function () {
      $uibModalInstance.dismiss();
    }
  });
