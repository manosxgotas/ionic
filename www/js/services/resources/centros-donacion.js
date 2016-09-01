angular.module('donacion')

  .factory('CentrosDonacionService', function (global, $resource) {

    var listadoUrl = global.getApiUrl() + '/listado-centros-donacion/';
    var infoUrl = global.getApiUrl() + '/centro/:id';

    function infoCentro(){
      return $resource(
        infoUrl,
        { id : '@_id'},
        {
          query: {
            method: 'GET',
            isArray: false
          }
        });
    }

    return {

      infoCentro: function () {
        return infoCentro();
      },

      listadoCentros: function () {
        return $resource(listadoUrl);
      }
    }

  });
