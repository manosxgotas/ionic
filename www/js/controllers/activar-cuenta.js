angular.module('donacion')
  .controller('ActivarCuentaController', function ($scope, $stateParams, AuthService) {
    $scope.correct = false;
    AuthService.accountActivateLink().get({token: $stateParams.token},
       function(response){
         $scope.correct = true;
         alert('correct' + response.mensaje)
         $scope.response = response.mensaje;
     }, function (error) {
        alert('error' + error.mensaje)
        $scope.response = error.mensaje;
     })
  });
