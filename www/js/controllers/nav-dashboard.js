angular.module('donacion')
  .controller('NavDashboardController', function ($http, $scope, $rootScope, $uibModal, CurrentUserService, EventosService, DonacionesService, SolicitudesService, localStorageService) {

    $rootScope.currentUser = CurrentUserService.getCurrentUser().get();

    DonacionesService.getDiasProxDonacion().get({}, function(data) {
      $rootScope.diasProxDonacion = data.dias;
    });

    SolicitudesService.obtenerCantidadSolicitudesCompatibles().get({}, function(data) {
      $rootScope.solicitudesCompatibles = data.cantidad_solicitudes_compatibles;
    });

    EventosService.obtenerCantidadEventosEnCurso().get({}, function(data) {
      $rootScope.eventosEnCurso = data.cantidad_eventos_en_curso;
    });



    $scope.logoff = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/logoff.html',
        size: 'md',
        controller: 'LogoffController'
      });
    }

  });
