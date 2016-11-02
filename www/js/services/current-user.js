angular.module('donacion')

  .factory('CurrentUserService', function (global, $q, $state, $resource) {

    // URL para obtener (GET) el perfil del donante.
    var getCurrentUserUrl = global.getApiUrl() + '/donantes/mi-perfil/';

    // Función que obtiene los datos del perfil del donante.
    function getCurrentUser() {
      return $resource(
        getCurrentUserUrl,
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }

    return {

      getCurrentUser: function () {
        return getCurrentUser()
      }
    }
  });
