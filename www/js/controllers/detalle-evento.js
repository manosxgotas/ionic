angular.module('donacion')
  .controller('DetalleEventoController', function ($scope, $stateParams, EventosService, video) {

    $scope.option = 1;
    $scope.changeOption = function (option) {
      $scope.option = option;
    };

    $scope.map = {
      zoom: 14,
      center: {
        latitude: 0,
        longitude: 0
      },
      options: {
        streetViewControl: false,
        mapTypeControl: false,
        keyboardShortcuts: false,
        clickableIcons: false,
      }
    };

		$scope.evento = EventosService.infoEvento().query({id : $stateParams.eventoID}, function () {

      if($scope.evento.video) {
        video.addSource('mp4', $scope.evento.video);
      }
      $scope.markers = [];
      angular.forEach($scope.evento.lugarEvento, function (lugar, nombre) {
        if(lugar.lugarDonacion.direccion.posicion) {
          var from = lugar.lugarDonacion.direccion.posicion.split(',');
          $scope.markers.push(
            {
              id: lugar.id,
              coords: {
                latitude: from[0],
                longitude: from[1]
              }
            }
          );
          if($scope.map.center.latitude == 0 && $scope.map.center.longitude == 0) {
            $scope.map.center = {
              latitude: from[0],
              longitude: from[1]
            }
          }
        }
      });

      $scope.slides = [];
      var currIndex = 0;
      angular.forEach($scope.evento.imagenesEvento, function (atributo, nombre) {
        angular.forEach(atributo, function (valor, clave) {
          if (clave == 'imagen') {
            var newWidth = 600 + $scope.slides.length + 1;
            $scope.slides.push({
              image: valor,
              id: currIndex++
            });
          }
        });
      });
    });
    console.log($scope.evento)
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		$scope.slides = [];
  });
