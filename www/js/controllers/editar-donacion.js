angular.module('donacion')
  .controller('EditarDonacionController', function ($http, $scope, $stateParams, AuthService, ProfileService, DonacionesService, CentrosDonacionService, EventosService) {

    $scope.DPOptions = {
      maxDate: new Date()
    };

    AuthService.isLogged(function () {
      $scope.donacion = {};

      $scope.perfil = ProfileService.getProfile().get();

      $scope.centros = CentrosDonacionService.query();

      $scope.eventos = EventosService.query();

      var data = DonacionesService.infoDonacion().query({id: $stateParams.donacionID}, function () {
        $scope.donacion = data;
        $scope.donacion.fecha = moment(data.fechaHora, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY');
        $scope.donacion.hora = moment(data.fechaHora, 'DD/MM/YYYY HH:mm').format('HH:mm');
      });

      $scope.updateDonacion = function(foto) {
        if (foto != undefined) {
          DonacionesService.editarDonacion($scope.donacion, foto.file);
        } else {
          DonacionesService.editarDonacion($scope.donacion);
        }
      }
    });
  });
