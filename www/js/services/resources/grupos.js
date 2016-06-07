angular.module('donacion')

  .factory('GruposService', function (global, $resource) {

    var url = global.getApiUrl() + '/listado-grupos-sanguineos/';

    return $resource(url);

  });
