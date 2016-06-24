angular.module('donacion')

  .factory('GruposSanguineosService', function (global, $resource) {

    var url = global.getApiUrl() + '/listado-grupos-sanguineos/';

    return $resource(url);

  });
