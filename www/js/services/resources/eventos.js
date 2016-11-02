angular.module('donacion')

  .factory('EventosService', function (global, $resource) {

    var listadoUrl = global.getApiUrl() + '/listado-eventos/';
    var infoUrl = global.getApiUrl() + '/evento/:id';
    var cantidadEventosUrl = global.getApiUrl() + '/cantidad-eventos/';

    function infoEvento(){
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

    function obtenerCantidadEventosEnCurso(){
      return $resource(
        cantidadEventosUrl,
        {},
        {
          query: {
            method: 'GET',
            isArray: false
          }
        });
    }

    return {

      infoEvento : function(){
    		return infoEvento();
    	},

    	listadoEventos :  function(){
    		return $resource(listadoUrl);
    	},

      obtenerCantidadEventosEnCurso :  function(){
        return obtenerCantidadEventosEnCurso();
      }

    }
  });
