angular.module('donacion')
  .controller('ProfileEditController',
    function ($http,
              $scope,
              $uibModal,
              localStorageService,
              ProfileService,
              DireccionesService,
              GruposSanguineosService,
              TiposDocumentosService,
              NacionalidadesService) {


        // Obtengo los tipos de documentos de la API
    $scope.tiposDocumentos = TiposDocumentosService.query();

    // Obtengo las nacionalidades de la API
    $scope.nacionalidades = NacionalidadesService.query();

    // Obtengo los grupos sanguíneos de la API
    $scope.gruposSanguineos = GruposSanguineosService.listadoGruposSanguineos().query();

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

    if ($scope.datosDonante.nacimiento != null) {
      var from = $scope.datosDonante.nacimiento.split("-");
      $scope.datosDonante.nacimiento = new Date(from[0], from[1] - 1, from[2]);
    }

    // Obtengo los datos de perfil del donante desde la API ---->

    $scope.modalDireccion = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/donantes/modal-direccion.html',
        size: 'md',
        controller: 'DireccionController',
        resolve: {
          donante: function () {
            return $scope.datosDonante;
          }
        }
      });
    }


    $scope.update = function () {
      ProfileService.updateProfile($scope.datosDonante);
    }
  });
