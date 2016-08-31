angular.module('donacion')
  .controller('EventosController', function ($scope, EventosService) {
  	$scope.eventos = EventosService.listadoEventos().query({}, function () {
      // Con esta funcion verifico que eventos tienen foto de portada, para que en el caso de que no tenga cargo una imagen por defecto,
      // la llamo cuando voy a cargar los eventos.
      $scope.tienePortada = function() {
        angular.forEach($scope.eventos, function (evento, eventoNro) {
          angular.forEach(evento.imagenesEvento, function (imagen, key) {
            if (imagen.portada == true) {
              evento.tienePortada = true
            }
          });
        });
      };
    });
  });



