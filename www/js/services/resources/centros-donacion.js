angular.module('donacion')

  .factory('CentrosDonacionService', function (global, $resource) {

    var url = global.getApiUrl() + '/listado-centros-donacion/';

    return $resource(url);

  });
