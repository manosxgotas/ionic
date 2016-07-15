angular.module('donacion')
  .controller('EliminarDonacionController', function ($http, $scope, $uibModalInstance, AuthService, DonacionesService, idDonacion) {

    AuthService.isLogged(function () {
      $scope.eliminar = function () {
        DonacionesService.eliminarDonacion(idDonacion);
        $uibModalInstance.dismiss();
      };

      $scope.cerrarModal = function () {
        $uibModalInstance.dismiss();
      }
    })
  });
