angular.module('donacion')

  .factory('DonacionesService', function (global, $http, $resource, $state, $filter, ngNotify, localStorageService, CurrentUserService) {

    var infoUrl = global.getApiUrl() + '/donaciones/:id';

    var registrarUrl = global.getApiUrl() + '/donaciones/crear/';

    var eliminarUrl = global.getApiUrl() + '/donaciones/eliminar/';

    var editarUrl = global.getApiUrl() + '/donaciones/editar/';

    var verificarCodigoUrl = global.getApiUrl() + '/donaciones/verificar-codigo/';

    var verificarImagenUrl = global.getApiUrl() + '/donaciones/verificar-imagen/';


    function infoDonacion() {
      return $resource(
        infoUrl,
        { id: '@_id' },
        {
          query: {
            method: 'GET',
              isArray: false
          }
        }
      );
    }

    function registrarDonacion(donacion, idRegistro, foto) {

      $http({
        url: registrarUrl,
        method: "POST",
        data: {
          fechaHora: $filter('date')(donacion.fecha, 'dd/MM/yyyy') + ' ' + $filter('date')(donacion.hora, 'HH:mm'),
          centroDonacion: donacion.centroDonacion,
          evento: donacion.evento,
          direccion: donacion.direccion,
          descripcion: donacion.descripcion,
          registro: idRegistro,
          foto: foto
        },
        headers: {'Content-Type': undefined},

        transformRequest: function (data) {
          if (data === undefined) return data;
          var fd = new FormData();
          angular.forEach(data, function (value, key) {
            if (value !== null && value !== undefined) {
              if (typeof value === 'object' && !(value instanceof File)) {
                fd.append(key, angular.toJson(value));
              } else {
                fd.append(key, value);
              }
            }
          });
          return fd;
        }
      }).success(function (response) {
        console.log(response)
        ngNotify.set(
          '<span class="fa fa-tint"></span>&nbsp; ¡Tu donación se ha registrado exitosamente!',
          'info'
        );
        CurrentUserService.setCurrentUser();
        $state.transitionTo('dashboard.libreta');
      }).error(function (response) {
        console.log(response);
        ngNotify.set(
          response,
          'info'
        );
      });
    }

    function editarDonacion(donacion, foto) {

      $http({
        url: editarUrl + donacion.id,
        method: "PUT",
        data: {
          fechaHora: $filter('date')(donacion.fecha, 'dd/MM/yyyy') + ' ' + $filter('date')(donacion.hora, 'HH:mm'),
          centroDonacion: donacion.centroDonacion,
          evento: donacion.evento,
          direccion: donacion.direccion,
          descripcion: donacion.descripcion,
          registro: 1,
          foto: foto
        },
        headers: {'Content-Type': undefined},

        transformRequest: function (data) {
          if (data === undefined) return data;
          var fd = new FormData();
          angular.forEach(data, function (value, key) {
            if (value !== null && value !== undefined) {
              if (typeof value === 'object' && !(value instanceof File)) {
                fd.append(key, angular.toJson(value));
              } else {
                fd.append(key, value);
              }
            }
          });
          return fd;
        }
      }).success(function () {
        $state.transitionTo('dashboard.libreta');
        ngNotify.set(
          '<span class="fa fa-tint"></span>&nbsp; ¡Se ha actualizado con éxito la información de tu donación!',
          'info'
        );
      }).error(function (response, data) {
        console.log(response);
        console.log(data);
        console.log(foto)
      });
    }

    function eliminarDonacion(idDonacion) {
      $http({
        url: eliminarUrl + idDonacion,
        method: 'DELETE'
      }).success(function () {
        ngNotify.set(
          '<span class="fa fa-trash"></span>&nbsp; ¡Se ha eliminado correctamente tu donación!',
          'info'
        );
        CurrentUserService.setCurrentUser();
      }).error(function(response, data) {
        console.log(response);
        console.log(data);
      })
    }

    function verificarCodigoDonacion(idDonacion, verificacion) {

      $http({
        url: verificarCodigoUrl + idDonacion,
        method: "POST",
        data: {
          codigo: verificacion.codigo
        }

      }).success(function (response) {
        ngNotify.set(
          '<span class="fa fa-key"></span>&nbsp; ' + response.mensaje,
          'info'
        );
        CurrentUserService.setCurrentUser();
      }).error(function (response) {
        ngNotify.set(
          '<span class="fa fa-warning"></span>&nbsp; ' + response.mensaje,
          'warn'
        );
      });
    }

    function verificarImagenDonacion(idDonacion, imagen) {

      $http({
        url: verificarImagenUrl + idDonacion,
        method: "POST",
        data: {
          imagen: imagen,
          donacion: idDonacion
        },
        headers: {'Content-Type': undefined},

        transformRequest: function (data) {
          if (data === undefined) return data;
          var fd = new FormData();
          angular.forEach(data, function (value, key) {
            if (value !== undefined && value != null) {
              fd.append(key, value);
            }
          });
          return fd;
        }

        }).success(function (response) {
        ngNotify.set(
          '<span class="fa fa-clock-o"></span>&nbsp; ¡La imágen de verificación ha sido registrada correctamente! Deberás esperar a que un administrador la evalúe.',
          'info'
        );
        CurrentUserService.setCurrentUser();
        }).error(function (response, data) {
        ngNotify.set(
          '<span class="fa fa-warning"></span>&nbsp; Ha ocurrido un error al intentar procesar tu imágen, inténtalo de nuevo.',
          'warn'
        );
        });
    }

    function getDiasProxDonacion() {
      var currentUser = localStorageService.get('currentUser');
      var userid = currentUser.usuario.id;
      var proxDonacionUrl = global.getApiUrl() + '/donaciones/proxima-donacion/' + userid;

      return $resource(
        proxDonacionUrl,
        {},
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }

    return {

      infoDonacion: function () {
        return infoDonacion();
      },

      registrarDonacion: function () {

        // registrarDonacion(donacion, idRegistro)
        if (arguments.length == 2) {
          registrarDonacion(arguments[0], arguments[1]);
          return;

        // registrarDonacion(donacion, idRegistro, fotoDonacion)
        } else {
          registrarDonacion(arguments[0], arguments[1], arguments[2]);
          return;
        }
      },

      editarDonacion: function () {

        // editarDonacion(donacion)
        if (arguments.length == 1) {
          editarDonacion(arguments[0]);
          return;

          // editarDonacion(donacion, fotoDonacion)
        } else {
          editarDonacion(arguments[0], arguments[1]);
          return;
        }
      },

      eliminarDonacion: function (idDonacion) {
        return eliminarDonacion(idDonacion);
      },

      verificarCodigoDonacion: function (idDonacion, verificacion) {
        return verificarCodigoDonacion(idDonacion, verificacion);
      },

      verificarImagenDonacion: function (idDonacion, imagen) {
        return verificarImagenDonacion(idDonacion, imagen);
      },

      getDiasProxDonacion: function () {
        return getDiasProxDonacion();
      }
    }

  });

