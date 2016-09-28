angular.module('donacion')

  .factory('TiposSolicitudesService', function (global, $resource) {

    var url = global.getApiUrl() + '/solicitudes/listado-tipos-solicitudes/';

    return $resource(url);

  });
