angular.module('donacion')
  .controller('EliminarSolicitudController', function ($http, $scope, $uibModalInstance, SolicitudesService, idSolicitud) {

    $scope.eliminar = function () {
      SolicitudesService.eliminarSolicitud(idSolicitud);
      $uibModalInstance.dismiss();
    };

    $scope.cerrarModal = function () {
      $uibModalInstance.dismiss();
    }
  });
