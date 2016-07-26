angular.module('donacion')
  .controller('VerificarDonacionController', function ($http, $scope, $uibModalInstance, AuthService, DonacionesService, idDonacion) {

    AuthService.isLogged(function () {

      $scope.verificacion = {};

      $scope.imagen = {};

      $scope.cambiarTipoVerificacion = function (imagen) {
        $scope.verificacion.codigo = undefined;
        imagen.cancel();
      };

      $scope.verificar = function (imagen) {

        if ($scope.verificacion.codigo != undefined) {
          DonacionesService.verificarCodigoDonacion(idDonacion, $scope.verificacion);
        } else {
          DonacionesService.verificarImagenDonacion(idDonacion, imagen.file);
        }

        $uibModalInstance.dismiss();
      };

      $scope.cerrarModal = function () {
        $uibModalInstance.dismiss();
      }
    })
  });
