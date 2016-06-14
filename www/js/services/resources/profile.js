angular.module('donacion')

  .factory('ProfileService', function (global, jwtHelper, localStorageService, $resource, $http, $location) {

    // URL para obtener (GET) el perfil del donante.
    var getProfileUrl = global.getApiUrl() + '/donantes/perfil/';

    // URL para actualizar (PUT) el perfil del donante.
    var updateProfileUrl = global.getApiUrl() + '/donantes/perfil/edit/';

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
    function updateProfile(datosDonante) {
      var userid = getUserId();

      $http({
        url: updateProfileUrl + userid,
        method: "PUT",
        data: {
          usuario: {
            first_name: datosDonante.usuario.first_name,
            last_name: datosDonante.usuario.last_name
          },
          nacimiento: datosDonante.nacimiento,
          telefono: datosDonante.telefono,
          peso: datosDonante.peso,
          altura: datosDonante.altura,
          genero: datosDonante.genero,
          grupoSanguineo: datosDonante.grupoSanguineo.id,
          direccion: {
            calle: datosDonante.direccion.calle,
            numero: datosDonante.direccion.numero,
            piso: datosDonante.direccion.piso,
            numeroDepartamento: datosDonante.direccion.numeroDepartamento,
            localidad: datosDonante.direccion.localidad
          }
        }
        /*transformRequest: function(data, headersGetter) {
          if (data === undefined) return data;
          var fd = new FormData();
          angular.forEach(data, function(value, key) {
            /* Si es archivo
            if (value instanceof File) {
              /* Si es un solo archivo
                fd.append(key, value);

              /* Si no es archivo, se convierte a string y se manda la
               * clave:valor
            } else {
              if (value !== null && typeof value === 'object'){
                fd.append(key, angular.toJson(value));

                /*  angular.forEach(value, function (valueV, keyV) {
                  fd.append(key + '.' + keyV, angular.toJson(valueV));
                  if (valueV !== null && typeof valueV === 'object') {
                    angular.forEach(valueV, function (valueVV, keyVV) {
                      fd.append(key + '.' + keyV + '.' + keyVV, angular.toJson(valueVV));
                    })
                  }
                });
              } else {
                fd.append(key, value);
              }
            }
          });
          return fd;
        }*/
      }).success(function (response) {
        console.log('Update realizado con éxito');
        $location.path('/perfil')
      }).error(function(response, data) {
        console.log(response)
        console.log(data)
      });

    }

    return {
      getProfile: function() {
        return getProfile();
      },

      updateProfile: function (datosDonante) {
        return updateProfile(datosDonante);
      }
    }

  });
