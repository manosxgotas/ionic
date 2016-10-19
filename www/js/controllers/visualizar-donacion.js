angular.module('donacion')
  .controller('VisualizarDonacionController', function ($http, $scope, $uibModalInstance, DonacionesService, idDonacion) {

    $scope.donacion = DonacionesService.infoDonacion().query({id: idDonacion}, function () {
      $scope.donacion.fecha = moment($scope.donacion.fechaHora).format('')

      if($scope.donacion.estado) {
        switch ($scope.donacion.estado) {
          case "1":
            $scope.sentimiento = {
              img: "../img/sentimientos/muy-mal.png",
              nombre: "muy mal"
            };
            break;
          case "2":
            $scope.sentimiento = {
              img: "../img/sentimientos/mal.png",
              nombre: "mal"
            };
            break;
          case "3":
            $scope.sentimiento = {
              img: "../img/sentimientos/descompuesto.png",
              nombre: "descompuesto"
            };
            break;
          case "4":
            $scope.sentimiento = {
              img: "../img/sentimientos/bien.png",
              nombre: "bien"
            };
            break;
          case "5":
            $scope.sentimiento = {
              img: "../img/sentimientos/muy-bien.png",
              nombre: "muy bien"
            };
            break;
          case "6":
            $scope.sentimiento = {
              img: "../img/sentimientos/excelente.png",
              nombre: "excelente"
            };
            break;
        }
      }
    });

    $scope.cerrarModal = function () {
      $uibModalInstance.dismiss();
    }
  });
