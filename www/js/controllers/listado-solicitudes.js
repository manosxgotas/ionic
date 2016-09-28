angular.module('donacion')
  .controller('ListadoSolicitudesController', function ($scope, SolicitudesService, CentrosDonacionService, GruposSanguineosService) {
    $scope.portada = [];
    $scope.estado = [];
    $scope.grupos = [];
    $scope.solicitudes = SolicitudesService.listadoSolicitudes().query({}, function () {
      angular.forEach($scope.solicitudes, function (solicitud, clave) {
        var inicio = new Date(solicitud.fechaHoraInicio);
        var fin = new Date(solicitud.fechaHoraFin);
        var today = new Date();
        if(inicio > today) {
          $scope.estado[solicitud.id] = {
            nombre: 'Próximamente',
            color: 'warning',
            icono: 'fa-clock-o'
          }
        } else if (inicio < today && fin > today) {
          $scope.estado[solicitud.id] = {
            nombre: '¡Ahora!',
            color: 'danger',
            icono: 'fa-heart'
          }
        } else {
          $scope.estado[solicitud.id] = {
            nombre: 'Concluído',
            color: 'default',
            icono: 'fa-check'
          }
        }

        var data =  CentrosDonacionService.infoCentro().query({id:solicitud.centroDonacion},function(){
          $scope.solicitudes[clave].centroDonacion = data
        });

        angular.forEach(solicitud.imagenesSolicitud, function (imagen, key) {

          if (imagen.portada == true && $scope.portada[solicitud.id] == undefined) {

            $scope.portada[solicitud.id] = imagen;
          }
        });

        angular.forEach(solicitud.gruposSanguineos, function(value, key){
          if($scope.grupos[solicitud.id] != undefined) {
            $scope.grupos[solicitud.id] = $scope.grupos[solicitud.id] + ", " + value.grupoSanguineo.nombre

          } else {
            $scope.grupos[solicitud.id] = value.grupoSanguineo.nombre;
          }
        });

        $scope.solicitudes[clave].gruposSanguineos = $scope.grupos[solicitud.id];

      });
    });

    $scope.filtrado = false;

    $scope.filtrarSolicitudes = function () {
      $scope.gruposDonante = [];

      if($scope.filtrado == false) {
        var gs =  GruposSanguineosService.infoGrupoSanguineo().query({id:$scope.currentUser.grupoSanguineo.id},function(){
          angular.forEach(gs.puedeDonarA, function(valor, clave) {
            $scope.gruposDonante.push(valor.nombre)
          });
          $scope.filtrado = true;
        })
      } else {
        $scope.filtrado = false;
        $scope.gruposDonante = undefined;
      }
    }
  });
