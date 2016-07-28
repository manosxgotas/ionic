angular.module('donacion')
  .controller('EditarDonacionController', function ($http, $scope, $stateParams, $filter, AuthService, ProfileService, DireccionesService, DonacionesService, CentrosDonacionService, EventosService) {

    $scope.DPOptions = {
      maxDate: new Date()
    };

    AuthService.isLogged(function () {

      $scope.donacion = {
        direccion: {}
      };

      // Al cambiar de option en el lugar elimino los datos almacenados de otra opción.
      $scope.cambioLugar = function () {
        $scope.donacion.centroDonacion = undefined;
        $scope.donacion.evento = undefined;
        $scope.donacion.direccion = undefined;
      };

      // Obtengo datos de perfil del donante.
      $scope.perfil = ProfileService.getProfile().get();

      // Obtengo las provincias de la API.
      $scope.provincias = DireccionesService.getProvincias().query();

      // Según la provincia elegida obtengo sus localidades.
      $scope.obtenerLocalidades = function(idprov) {
        $scope.localidades = DireccionesService.getLocalidades(idprov).query();
      };

      // Obtengo los centros de donación de la API.
      $scope.centros = CentrosDonacionService.query();

      // Obtengo los eventos de la API.
      $scope.eventos = EventosService.query();

      var data = DonacionesService.infoDonacion().query({id: $stateParams.donacionID}, function () {

        // Seteo en el scope los datos obtenidos de la donación.
        $scope.donacion = data;
        $scope.donacion.fecha = data.fechaHora;
        $scope.donacion.hora = data.fechaHora;

        // Si la donación fue realizada en un centro de donación.
        if (data.lugarDonacion.lugarCentro != null) {

          $scope.donacion.lugar = 1;
          $('#opcionCentro').addClass('checked');
          $scope.donacion.centroDonacion = data.lugarDonacion.lugarCentro.id;

        // Si la donación fue realizada en un evento.
        } else if (data.lugarDonacion.lugarEventoDonacion != null) {

          $scope.donacion.lugar = 2;
          $('#opcionEvento').addClass('checked');
          $scope.donacion.evento = data.lugarDonacion.lugarEventoDonacion.id;

        // Si la donación fue realizada en otro lugar.
        } else {

          $scope.donacion.lugar = 3;
          $('#opcionOtro').addClass('checked');
          $scope.localidades = DireccionesService.getLocalidades(data.lugarDonacion.direccion.localidad.provincia.id).query();
            $scope.donacion.direccion = {
              provincia: data.lugarDonacion.direccion.localidad.provincia.id,
              localidad: data.lugarDonacion.direccion.localidad.id,
              calle: data.lugarDonacion.direccion.calle,
              numero: data.lugarDonacion.direccion.numero
          };

        }
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
