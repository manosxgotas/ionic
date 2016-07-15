angular.module('donacion')

  .factory('EventosService', function (global, $resource) {

    var url = global.getApiUrl() + '/listado-eventos/';

    return $resource(url);

  });
