angular.module('donacion')

  .factory('ProfileService', function (global, jwtHelper, localStorageService, $resource, $http) {
    
    // URL para obtener (GET) el perfil del donante.
    var getProfileUrl = global.getApiUrl() + '/donantes/perfil/';
    
    // URL para actualizar (PUT) el perfil del donante.
    var updateProfileUrl = global.getApiUrl() + 'donantes/perfil/edit/';

    // Función que obtiene el id del usuario mediante la decodificación 
    // del token almacenado en el LocalStorage.
    function getUserId() {
      var token = localStorageService.get('Token');
      var authdata = token.substring(5);
      return jwtHelper.decodeToken(authdata).user_id;
    }
    
    // Función que obtiene los datos del perfil del donante.
    function getProfile() {
      var userid = getUserId();

      return $resource(
        getProfileUrl + userid,
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }

    // Función que actualiza los datos del perfil del donante.
    function updateProfile() {
      var userid = getUserId();

      $http({
        url: updateProfileUrl + userid,
        dataType: "json",
        method: "PUT",
        data: {
        }
      }).success(function (response) {

        });

    }

    return {
      getProfile: function() {
        return getProfile();
      },

      updateProfile: function () {
        return updateProfile();
      }
    }

  });
