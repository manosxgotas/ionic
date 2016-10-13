angular.module('donacion')
  .controller('NavDashboardController', function ($http, $scope, $rootScope, $uibModal, ProfileService, DonacionesService, localStorageService) {

    $scope.currentUser = localStorageService.get('currentUser');

    DonacionesService.getDiasProxDonacion().get({}, function (data) {
        $rootScope.diasProxDonacion = data.dias;
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
