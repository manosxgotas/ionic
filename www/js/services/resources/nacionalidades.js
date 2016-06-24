angular.module('donacion')

  .factory('NacionalidadesService', function (global, $resource) {

    var url = global.getApiUrl() + '/listado-nacionalidades/';
    
    return $resource(url);

  });
