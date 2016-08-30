angular.module('donacion')
  .controller('ActivarCuentaClaveController', function ($scope, AuthService) {

    $scope.activarCuenta = function () {
      AuthService.accountActivateKey($scope.key);
    };

  });
