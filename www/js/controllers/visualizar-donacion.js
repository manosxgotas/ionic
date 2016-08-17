angular.module('donacion')
  .controller('VisualizarDonacionController', function ($http, $scope, $uibModalInstance, DonacionesService, idDonacion) {

    $scope.loading = false;

    $scope.$on('cfpLoadingBar:loading', function () {
      $scope.loading = true;
    });

    $scope.$on('cfpLoadingBar:completed', function () {
      $scope.loading = false;
    });

    $scope.donacion = DonacionesService.infoDonacion().query({id: idDonacion}, function () {
      $scope.donacion.fecha = moment($scope.donacion.fechaHora).format('')
    });
    console.log($scope.donacion);

    $scope.cerrarModal = function () {
      $uibModalInstance.dismiss();
    }
  });
