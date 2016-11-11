angular.module('donacion')
  .controller('ListadoSolicitudesController', function ($scope, SolicitudesService, CentrosDonacionService, GruposSanguineosService) {
    $scope.portada = [];
    $scope.estado = [];
    $scope.grupos = [];
    $scope.maxSize = 5;

    function poblarControlador(solicitudes) {
      $scope.solicitudes = solicitudes.results;
      $scope.count = solicitudes.count;
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

    }

    $scope.pageChanged = function () {
      var solicitudes = SolicitudesService.listadoSolicitudes($scope.currentPage).query({}, function () {
        poblarControlador(solicitudes);
      });
    };

    var solicitudes = SolicitudesService.listadoSolicitudes().query({}, function () {
      $scope.currentPage = 1;
      poblarControlador(solicitudes);
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
