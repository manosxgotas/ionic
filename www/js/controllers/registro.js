angular.module('donacion')
  .controller('RegistroController', function ($http, $scope, RegistroService, DireccionesService) {

    $scope.datosDonante = {
      usuario: undefined,
      donante: undefined,
      direccion: undefined,
    };

    $scope.provincias = DireccionesService.getProvincias().query();

    $scope.obtenerLocalidades = function(idprov) {
      $scope.localidades = DireccionesService.getLocalidades(idprov).query();
    };

    // <---- DatePicker fecha de nacimiento
    $scope.nacimientoDPOptions = {
      initDate: new Date(1950, 0, 1),
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2010, 0, 1)
    };

    $scope.nacimientoDP = {
      opened: false
    };

    $scope.format = "dd/MM/yyyy";

    $scope.openDatePicker = function() {
      $scope.nacimientoDP.opened = true;
    };
    // DatePicker fecha de nacimiento ---->

    $scope.signup = function() {
      RegistroService.registrarse($scope.datosDonante);
    }
  });
