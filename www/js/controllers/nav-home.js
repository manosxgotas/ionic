angular.module('donacion')
  .controller('NavHomeController', function ($scope, LoginModal, LogoffService, localStorageService, $uibModal) {

    $scope.currentUser = localStorageService.get('currentUser');

    $scope.logoff = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/logoff.html',
        size: 'md',
        controller: 'LogoffController'
      });
    };

    $scope.openLoginModal = function () {
      LoginModal();
    };

    $scope.openRegistroModal = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/registro.html',
        size: 'md',
        controller: 'RegistroController'
      });
    };
  });
