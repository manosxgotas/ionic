angular.module('donacion')
  .controller('DetalleEventoController', function ($scope, $stateParams, EventosService, video) {

    $scope.tab = 1;
    $scope.changeTab = function (number) {
      if(number == 1) {
        $('#tabFotos').addClass('active');
        $scope.tab = 1;
      } else {
        $('#tabVideo').addClass('active');
        $scope.tab = 2;
      }
    };

		$scope.evento = EventosService.infoEvento().query({id : $stateParams.eventoID}, function () {
      video.addSource('mp4', $scope.evento.video);
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
