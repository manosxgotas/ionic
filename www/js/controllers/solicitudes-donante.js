angular.module('donacion')
  .controller('SolicitudesDonanteController', function ($http, $scope, SolicitudesService, $uibModal) {

    $scope.solicitudes = SolicitudesService.solicitudesDonante().query();

    $scope.modalEliminar = function (id) {
      $scope.loading = false;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'templates/donantes/modal-eliminar-solicitud.html',
        size: 'md',
        controller: 'EliminarSolicitudController',
        resolve: {
          idSolicitud: function () {
            return id;
          }
        }
      });
    };

  });
