angular.module('donacion')
  .controller('VisualizarDonacionController', function ($http, $scope, $uibModalInstance, DonacionesService, idDonacion) {

    $scope.donacion = DonacionesService.infoDonacion().query({id: idDonacion}, function () {
      $scope.donacion.fecha = moment($scope.donacion.fechaHora).format('')
    });

    $scope.cerrarModal = function () {
      $uibModalInstance.dismiss();
    }
  });
