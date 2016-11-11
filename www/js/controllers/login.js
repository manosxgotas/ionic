angular.module('donacion')
  .controller('LoginController', function ($scope, AuthService, $uibModalInstance, $uibModal) {

    $scope.credentials = {};

    $scope.login = function() {
      AuthService.login($scope.credentials).then(function () {
        $uibModalInstance.close();
      });
    };

    $scope.close = function () {
      $uibModalInstance.dismiss('cerrar');
    };

    $scope.resetPass = function () {
      $uibModalInstance.close();
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/reset-pass-req.html',
        size: 'md',
        controller: 'ResetPassReqController'
      });
    };
    $scope.openRegistroModal = function () {
      $uibModalInstance.close();
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/registro.html',
        size: 'md',
        controller: 'RegistroController'
      });
    };
  });
