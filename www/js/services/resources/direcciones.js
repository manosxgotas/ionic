angular.module('donacion')

  .factory('DireccionesService', function (global, $resource) {

    var provinciasURL = global.getApiUrl() + '/direcciones/listado-provincias/';

    var localidadesURL = global.getApiUrl() + '/direcciones/localidades/provincia/';

    function getProvincias() {

      return $resource(provinciasURL);

    }

    function getLocalidades(idProvincia) {

      return $resource(localidadesURL + idProvincia, {}, {
        query: {
          method: 'GET',
          isArray: true,
          ignoreLoadingBar: true
        }
      })

    }

    return {

      getProvincias: function () {
        return getProvincias();
      },

      getLocalidades: function (idProvincia) {
        return getLocalidades(idProvincia);
      }
    }

  });
