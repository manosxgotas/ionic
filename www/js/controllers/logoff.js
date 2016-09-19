angular.module('donacion')
  .controller('LogoffController', function (LogoffService, $scope, AuthService, $uibModalInstance) {

    $scope.credentials = {};

    $scope.logoff = function() {
      LogoffService.logoff();
      $uibModalInstance.close();
    };

    $scope.close = function () {
      $uibModalInstance.dismiss('cerrar');
    };
  });
