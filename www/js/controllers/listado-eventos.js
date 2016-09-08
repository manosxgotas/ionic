angular.module('donacion')
  .controller('EventosController', function ($scope, EventosService) {
    $scope.portada = [];
    $scope.estado = [];
    $scope.eventos = EventosService.listadoEventos().query({}, function () {
      // Obtengo foto de portada del evento
      angular.forEach($scope.eventos, function (evento, clave) {
        var inicio = new Date(evento.fechaHoraInicio);
        var fin = new Date(evento.fechaHoraFin);
        var today = new Date();
        if(inicio > today) {
          $scope.estado[evento.id] = {
            nombre: 'Próximamente',
            color: 'warning',
            icono: 'fa-clock-o'
          }
        } else if (inicio < today && fin > today) {
          $scope.estado[evento.id] = {
            nombre: '¡Ahora!',
            color: 'danger',
            icono: 'fa-heart'
          }
        } else {
          $scope.estado[evento.id] = {
            nombre: 'Concluído',
            color: 'default',
            icono: 'fa-check'
          }
        }
        angular.forEach(evento.imagenesEvento, function (imagen, key) {
          if (imagen.portada == true && $scope.portada[evento.id] == undefined) {
            $scope.portada[evento.id] = imagen;
          }
        });
      });
    });
  });



