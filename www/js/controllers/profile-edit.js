angular.module('donacion')
  .controller('ProfileEditController',
    function ($http,
              $scope,
              localStorageService,
              ProfileService,
              DireccionesService,
              GruposSanguineosService,
              TiposDocumentosService,
              NacionalidadesService) {

    // Obtengo las provincias de la API.
    $scope.provincias = DireccionesService.getProvincias().query();

    // Obtengo los tipos de documentos de la API
    $scope.tiposDocumentos = TiposDocumentosService.query();

    // Obtengo las nacionalidades de la API
    $scope.nacionalidades = NacionalidadesService.query();

    // Obtengo los grupos sanguíneos de la API
    $scope.gruposSanguineos = GruposSanguineosService.query();

    // Según la provincia elegida obtengo sus localidades.
    $scope.obtenerLocalidades = function(idprov) {
      $scope.localidades = DireccionesService.getLocalidades(idprov).query();
    };

    // <---- DatePicker fecha de nacimiento
    $scope.nacimientoDPOptions = {
      initDate: new Date(1950, 0, 1),
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2010, 0, 1),
      datepickerMode: 'year'
    };

    $scope.nacimientoDP = {
      opened: false
    };

    $scope.format = 'dd/MM/yyyy';

    $scope.openDatePicker = function() {
      $scope.nacimientoDP.opened = true;
    };

    // DatePicker fecha de nacimiento ---->

    // <---- Obtengo los datos de perfil del donante desde la API
    $scope.datosDonante = localStorageService.get('currentUser');
      $scope.localidades = DireccionesService.getLocalidades($scope.datosDonante.direccion.localidad.provincia).query();

      var from = $scope.datosDonante.nacimiento.split("-");
      $scope.datosDonante.nacimiento = new Date(from[0], from[1] - 1, from[2]);
    // Obtengo los datos de perfil del donante desde la API ---->


    $scope.update = function () {
      ProfileService.updateProfile($scope.datosDonante);
      if ($scope.avatar != undefined) {
        ProfileService.updateAvatar($scope.avatar);
      }
    }
  });
