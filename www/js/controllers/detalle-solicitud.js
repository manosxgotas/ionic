angular.module('donacion')
  .controller('DetalleSolicitudController', function ($scope, $stateParams, SolicitudesService, video) {

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

    $scope.solicitud = SolicitudesService.infoSolicitud().query({id : $stateParams.solicitudID}, function () {

      if($scope.solicitud.video) {
        video.addSource('mp4', $scope.solicitud.video);
      }
      $scope.markers = [];


      if ($scope.solicitud.centroDonacion.lugarDonacion.direccion.posicion != null){
        var from = $scope.solicitud.centroDonacion.lugarDonacion.direccion.posicion.split(',');
        $scope.markers.push(
          {
            id: $scope.solicitud.centroDonacion.lugarDonacion.id,
            coords:{
              latitude: from[0],
              longitude: from[1]
            }
          }
        )
        console.log($scope.markers)
        if($scope.map.center.latitude == 0 && $scope.map.center.longitude == 0) {
          $scope.map.center = {
            latitude: from[0],
            longitude: from[1]
          }
        }
      }
      $scope.slides = [];
      var currIndex = 0;
      angular.forEach($scope.solicitud.imagenesSolicitud, function (atributo, nombre) {
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
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = [];
  });
