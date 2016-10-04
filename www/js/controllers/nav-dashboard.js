angular.module('donacion')
  .controller('NavDashboardController', function ($http, $scope, $rootScope, $uibModal, ProfileService, DonacionesService, localStorageService) {

    $scope.currentUser = localStorageService.get('currentUser');

    DonacionesService.getDiasProxDonacion().get({}, function (data) {
        $rootScope.diasProxDonacion = data.dias;
    });

    $scope.loading = false;

    $scope.$on('cfpLoadingBar:started', function () {
      $scope.loading = true;
    });

    $scope.$on('cfpLoadingBar:completed', function () {
      $scope.loading = false;
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
