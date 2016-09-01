angular.module('donacion')
  .controller('DetalleCentroController', function ($scope, $stateParams, CentrosDonacionService) {
    $scope.map = {
      zoom: 17,
      center: {
        latitude: 0,
        longitude: 0
      },
      options: {
        draggable: false,
        zoomControl: false,
        streetViewControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        keyboardShortcuts: false,
        clickableIcons: false,
        disableDoubleClickZoom: true
      }
    };

    $scope.horarios = [];
    $scope.centro = CentrosDonacionService.infoCentro().query({id: $stateParams.centroID}, function () {
      angular.forEach($scope.centro.horarios, function (horario, clave) {
        var dia;
        switch(horario.dia) {
          case '1':
            dia = 'Lunes';
            break;
          case '2':
            dia = 'Martes';
            break;
          case '3':
            dia = 'Miércoles';
            break;
          case '4':
            dia = 'Jueves';
            break;
          case '5':
            dia = 'Viernes';
            break;
          case '6':
            dia = 'Sábado';
            break;
          case '7':
            dia = 'Domingo';
            break;
        }

        var fromApertura = horario.horaApertura.split(':');
        var fromCierre = horario.horaCierre.split(':');

        $scope.horarios.push({
          dia: dia,
          horaApertura: new Date(0,0,0,fromApertura[0], fromApertura[1]),
          horaCierre: new Date(0,0,0,fromCierre[0], fromCierre[1])
        });
      });
      var from = $scope.centro.lugarDonacion.direccion.posicion.split(',');
      $scope.centro.coords = {
        latitude: from[0],
        longitude: from[1]
      };
      $scope.map.center = $scope.centro.coords;
    });

  });
