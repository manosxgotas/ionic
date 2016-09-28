angular.module('donacion')

  .factory('GruposSanguineosService', function (global, $resource) {

    var url = global.getApiUrl() + '/listado-grupos-sanguineos/';
    var infoUrl = global.getApiUrl() + '/grupo-sanguineo/:id';

    return {
      listadoGruposSanguineos: function(){
        return $resource(url)
      },

      infoGrupoSanguineo: function () {
        return $resource(
          infoUrl,
          { id: '@_id' },
          {
            query: {
              method: 'GET',
              isArray: false
            }
          }
        )
      }
    }
  });
