angular.module('donacion')

  .factory('CurrentUserService', function (global, $q, $state, localStorageService, $resource, jwtHelper) {

    // URL para obtener (GET) el perfil del donante.
    var getCurrentUserUrl = global.getApiUrl() + '/donantes/perfil/';

    // Función que obtiene el id del usuario mediante la decodificación
    // del token almacenado en el LocalStorage.
    function getUserId() {
      var token = localStorageService.get('Token');
      var authdata = token.substring(5);
      return jwtHelper.decodeToken(authdata).user_id;
    }

    // Función que obtiene los datos del perfil del donante.
    function getCurrentUser() {
      var userid = getUserId();

      return $resource(
        getCurrentUserUrl + userid,
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }

    function setCurrentUser() {
      var deferred = $q.defer();
      var currentUser = getCurrentUser().get({}, function () {
        localStorageService.set('currentUser', currentUser);
        $state.reload();
        deferred.resolve();
      });
      
      return deferred.promise;
    }

    return {

      setCurrentUser : function() {
        return setCurrentUser();
      }
    }
  });
