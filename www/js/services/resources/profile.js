angular.module('donacion')

  .factory('ProfileService', function (global, localStorageService, ngNotify, $http, $state, $filter, $window) {

    // URL para actualizar (PUT) el perfil del donante.
    var updateProfileUrl = global.getApiUrl() + '/donantes/perfil/edit/';

    // URL para actualizar (PUT) la foto de perfil del donante.
    var updateAvatarUrl = global.getApiUrl() + '/donantes/perfil/edit/avatar/';

    // URL para actualizar (PUT) la dirección del donante.
    var updateDireccionUrl = global.getApiUrl() + '/donantes/perfil/edit/direccion/';

    // Función que actualiza los datos del perfil del donante.
    function updateProfile(datosDonante) {
      if (datosDonante.grupoSanguineo == undefined) {
        datosDonante.grupoSanguineo = {
          id: null
        };
      }
      $http({
        url: updateProfileUrl,
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
          grupoSanguineo: datosDonante.grupoSanguineo.id
        }
      }).success(function () {
        ngNotify.set(
          '<span class="fa fa-user"></span>&nbsp; ¡Se han actualizado con éxito tus datos personales!',
          'info'
        );
        $state.transitionTo('dashboard.perfil');
      }).error(function (response, data) {
        console.log(response)
        console.log(data)
      });
    }

    // Función que actualiza la foto de perfil del donante.
    function updateAvatar(avatar) {
      $http({
        url: updateAvatarUrl,
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
        ngNotify.set(
          '<span class="fa fa-camera"></span>&nbsp; ¡Tu foto de perfil se ha actualizado con éxito!',
          'info'
        );
        $window.location.reload();
        $state.transitionTo('dashboard.perfil');
        }).error(function (response, data) {
        ngNotify.set(
          '<span class="fa fa-warning"></span>&nbsp; Hubo un problema al procesar tu nueva foto de perfil, inténtalo de nuevo.',
          'warn'
        );
        });
      }

      function updateDireccion(direccion) {
        $http({
          url: updateDireccionUrl,
          method: "PUT",
          data: {
            direccion: {
              calle: direccion.calle,
              numero: direccion.numero,
              piso: direccion.piso,
              numeroDepartamento: direccion.numeroDepartamento,
              localidad: direccion.localidad
            }
          }
        }).success(function (response) {
          ngNotify.set(
            '<span class="fa fa-map-marker"></span>&nbsp; ¡Tu dirección se ha actualizado con éxito!',
            'info'
          );
          $state.transitionTo('dashboard.perfil');
        }).error(function (response, data) {
          ngNotify.set(
            '<span class="fa fa-image"></span>&nbsp; Hubo un problema al procesar tu dirección, inténtalo de nuevo.',
            'warn'
          );
        });
      }

      return {

        updateProfile: function(datosDonante) {
          return updateProfile(datosDonante);
        },

        updateDireccion : function(direccion) {
          return updateDireccion(direccion);
        },

        updateAvatar : function(avatar) {
          return updateAvatar(avatar);
        }

      }

  });
