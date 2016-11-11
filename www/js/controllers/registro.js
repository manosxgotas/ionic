angular.module('donacion')
  .controller('RegistroController',
    function ($http,
              $scope,
              RegistroService,
              DireccionesService,
              TiposDocumentosService,
              NacionalidadesService,
              GruposSanguineosService,
              $uibModalInstance
              )
    {

      $scope.close = function () {
        $uibModalInstance.dismiss('cerrar');
      };

      // Inicializo variables
      $scope.donante = undefined;

      // Booleano para comprobar si los inputs de confirmación de pass y email son correctos.
      $scope.correoCheck = false;

      // Métodos para comprobar si los inputs de confirmación de pass y email son correctos y seteo validez.
      $scope.confirmarCorreo = function (formRegistro, confirmCorreo) {
        if ($scope.donante.email == confirmCorreo) {
          $scope.correoCheck = true;
          formRegistro.confirmCorreo.$setValidity('checkTrue', true);
        } else {
          $scope.correoCheck = false;
          formRegistro.confirmCorreo.$setValidity('checkTrue', false);
        }
      };

      $scope.signup = function() {
        RegistroService.registrarse($scope.donante).then(function () {
          $uibModalInstance.close();
        });
      }
  });
