angular.module('donacion')
  .controller('RegistrarDonacionController', function ($http, $scope, ProfileService, DonacionesService, DireccionesService, CentrosDonacionService, EventosService) {

    $scope.DPOptions = {
      maxDate: new Date()
    };

    $scope.donacion = {};

    // Al cambiar de option en el lugar elimino los datos almacenados de otra opción.
    $scope.cambioLugar = function () {
      $scope.donacion.centroDonacion = undefined;
      $scope.donacion.evento = undefined;
      $scope.donacion.direccion = undefined;
    };

    // Obtengo las provincias de la API.
    $scope.provincias = DireccionesService.getProvincias().query();

    // Según la provincia elegida obtengo sus localidades.
    $scope.obtenerLocalidades = function(idprov) {
      $scope.localidades = DireccionesService.getLocalidades(idprov).query();
    };

    $scope.centros = CentrosDonacionService.query();

    $scope.eventos = EventosService.listadoEventos().query();

    $scope.registrarDonacion = function(foto) {
      if (foto != undefined) {
        DonacionesService.registrarDonacion($scope.donacion, $scope.currentUser.registro.id, foto.file);
      } else {
        DonacionesService.registrarDonacion($scope.donacion, $scope.currentUser.registro.id);
      }
    }
  });
