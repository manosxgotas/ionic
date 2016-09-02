angular.module('donacion')
  .controller('ResetPassReqController',function ($scope, $uibModalInstance, AuthService) {

    $scope.close = function () {
      $uibModalInstance.close();
    };

    $scope.enviarMail = function () {
      AuthService.resetPassRequest($scope.correo);
      $uibModalInstance.close();
    }
  });
