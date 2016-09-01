angular.module('donacion')

  .factory('EventosService', function (global, $resource) {

    var listadoUrl = global.getApiUrl() + '/listado-eventos/';
    var infoUrl = global.getApiUrl() + '/evento/:id';

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

    return {

      infoEvento : function(){
    		return infoEvento();
    	},

    	listadoEventos :  function(){
    		return $resource(listadoUrl);
    	}

    }
  });
