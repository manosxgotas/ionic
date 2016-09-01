angular.module('donacion')
  .controller('CentrosDonacionController', function ($scope, $state, CentrosDonacionService) {
    $scope.map = {
      center: {latitude: -32.8897586, longitude: -68.8445271},
      zoom: 10
    };

    $scope.markers = [];
    $scope.mostrarDetalle = function (id) {
      $state.transitionTo('dashboard.detalle-centro', {centroID: id})
    };

    var centros = CentrosDonacionService.listadoCentros().query({}, function () {
      angular.forEach(centros, function (centro, clave) {
        var from = centro.lugarDonacion.direccion.posicion.split(',');
        $scope.markers.push({
          id: centro.id,
          options: {
            title: centro.nombre
          },
          coords: {
            latitude: from[0],
            longitude: from[1]
            }
          });
        })
      });
    });
