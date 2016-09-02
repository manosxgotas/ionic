angular.module('donacion')
  .controller('ResetPassController',function ($scope, $stateParams, AuthService) {
    AuthService.resetPassToken().get({token: $stateParams.token});

    $scope.passwordCheck = false;

    $scope.confirmarPassword = function (form, confirmPassword) {
      if ($scope.password == confirmPassword) {
        $scope.passwordCheck = true;
        form.confirmPassword.$setValidity('checkTrue', true);
      } else {
        $scope.passwordCheck = false;
        form.confirmPassword.$setValidity('checkTrue', false);
      }
    };

    $scope.resetPass = function () {
      AuthService.resetPass($scope.password, $scope.confirmPassword, $stateParams.token);
    }

  });
