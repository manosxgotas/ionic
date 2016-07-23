angular.module('donacion')
  .controller('InicioController', function ($http, $scope, $rootScope, $uibModal) {
    $scope.openLoginModal = function () {

      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/login.html',
        controller: 'LoginController',
        size: 'md',
      });
    }
  });
