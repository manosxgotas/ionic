angular.module('donacion')

  .factory('ProfileService', function (global, $rootScope, jwtHelper, localStorageService, $resource, $http, $location, $filter) {

    // URL para obtener (GET) el perfil del donante.
    var getProfileUrl = global.getApiUrl() + '/donantes/perfil/';

    // URL para actualizar (PUT) el perfil del donante.
    var updateProfileUrl = global.getApiUrl() + '/donantes/perfil/edit/';

    // URL para actualizar (PUT) la foto de perfil del donante.
    var updateAvatarUrl = global.getApiUrl() + '/donantes/perfil/edit/avatar/';


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
      if (datosDonante.grupoSanguineo == undefined) {
        datosDonante.grupoSanguineo.id = null;
      }
      $http({
        url: updateProfileUrl + userid,
        method: "PUT",
        data: {
          usuario: {
            first_name: datosDonante.usuario.first_name,
            last_name: datosDonante.usuario.last_name
          },
          tipoDocumento: datosDonante.tipoDocumento,
          numeroDocumento: datosDonante.numeroDocumento,
          nacionalidad: datosDonante.nacionalidad,
          nacimiento: $filter('date')(datosDonante.nacimiento, 'dd/MM/yyyy'),
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
      }).success(function (response) {
        $rootScope.nombre = datosDonante.usuario.first_name;
        $rootScope.apellido = datosDonante.usuario.last_name;
        console.log('Update realizado con éxito');
        $location.path('/perfil')
      }).error(function (response, data) {
        console.log(response)
        console.log(data)
      });
    }

    // Función que actualiza la foto de perfil del donante.
    function updateAvatar(avatar) {
        var userid = getUserId();

        $http({
          url: updateAvatarUrl + userid,
          method: "PUT",
          data: {
            foto: avatar
          },
          headers: {'Content-Type': undefined},

          transformRequest: function (data) {
            if (data === undefined) return data;
            var fd = new FormData();
            angular.forEach(data, function (value, key) {
              /* Si es archivo */
              if (value instanceof File) {
                fd.append(key, value);
              }
            });
            return fd;
          }

        }).success(function (response) {
          console.log('Cambio de avatar realizado con éxito');
          $rootScope.foto = response.foto;
          $location.path('/perfil')
        }).error(function (response, data) {
          console.log(response);
          console.log(data);
        });
      }

      return {
        getProfile: function() {
          return getProfile();
        },

        updateProfile: function(datosDonante) {
          return updateProfile(datosDonante);
        },

        updateAvatar : function(avatar) {
          return updateAvatar(avatar);
        },
        
        getUserId: function () {
          return getUserId();
        }

      }

  });
