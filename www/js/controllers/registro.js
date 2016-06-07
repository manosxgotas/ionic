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

    console.log($scope.provinciaId);

    $('#nacimiento').datepicker({
      language: 'es',
      defaultViewDate: {
        year: 1900,
        month: 01,
        day: 01
      },
      startDate: '01/01/1900',
      endDate: '31/12/2010',
      startView: 'decade',
      format: 'dd/mm/yyyy'
    });

    $scope.signup = function() {
      RegistroService.registrarse($scope.datosDonante);
    }
  });
