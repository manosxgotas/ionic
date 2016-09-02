angular.module('donacion')
  .controller('LoginController', function ($scope, AuthService, $uibModalInstance, $uibModal) {

    $scope.credentials = {};

    $scope.login = function() {
      AuthService.login($scope.credentials);
      $uibModalInstance.close();
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
    }
  });
