angular.module('donacion')
  .controller('SolicitudesDonanteController', function ($http, $scope, SolicitudesService, $uibModal) {
    $scope.maxSize = 5;

    function poblarControlador(solicitudes) {
      $scope.solicitudes = solicitudes.results;
      $scope.count = solicitudes.count;
    }

    var solicitudes = SolicitudesService.solicitudesDonante().query(function () {
      $scope.currentPage = 1;
      poblarControlador(solicitudes);
    });

    $scope.pageChanged = function () {
      var solicitudes = SolicitudesService.solicitudesDonante($scope.currentPage).query({}, function () {
        poblarControlador(solicitudes);
      });
    };

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
