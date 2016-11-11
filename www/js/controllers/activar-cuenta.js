angular.module('donacion')
  .controller('ActivarCuentaController', function ($scope, $stateParams, AuthService) {
    AuthService.accountActivateLink().get({token: $stateParams.token});
  });
