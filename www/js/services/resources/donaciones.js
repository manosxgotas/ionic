angular.module('donacion')

  .factory('DonacionesService', function (global, $http, $resource, $location, $state, $filter, ProfileService) {

    var infoUrl = global.getApiUrl() + '/donaciones/:id';

    var registrarUrl = global.getApiUrl() + '/donaciones/crear/';

    var eliminarUrl = global.getApiUrl() + '/donaciones/eliminar/';

    var editarUrl = global.getApiUrl() + '/donaciones/editar/';

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
          descripcion: donacion.descripcion,
          registro: idRegistro,
          foto: foto
        },
        headers: {'Content-Type': undefined},

        transformRequest: function (data) {
          if (data === undefined) return data;
          var fd = new FormData();
          angular.forEach(data, function (value, key) {
            if (value !== undefined) {
              fd.append(key, value);
            }
          });
          return fd;
        }
      }).success(function (response) {
        $state.transitionTo('dashboard.libreta');
      }).error(function (response, data) {
        console.log(response);
        console.log(data);
        console.log(foto)
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
          descripcion: donacion.descripcion,
          foto: foto
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
      }).success(function () {
        $location.path('/libreta');
        console.log('edición realizada con éxito');
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
        console.log('Eliminación exitosa');
        $location.path('/libreta')
      }).error(function(response, data) {
        console.log(response);
        console.log(data);
      })
    }

    function getDiasProxDonacion() {
      var proxDonacionUrl = global.getApiUrl() + '/donaciones/proxima-donacion/' + ProfileService.getUserId();

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

      getDiasProxDonacion: function () {
        return getDiasProxDonacion();
      }
    }

  });

