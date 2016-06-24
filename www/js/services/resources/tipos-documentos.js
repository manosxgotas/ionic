angular.module('donacion')

  .factory('TiposDocumentosService', function (global, $resource) {

    var url = global.getApiUrl() + '/listado-tipos-documentos/';

    return $resource(url);

  });
