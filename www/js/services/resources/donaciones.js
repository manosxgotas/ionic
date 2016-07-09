angular.module('donacion')

  .factory('DonacionesService', function (global, $http, $location, $filter) {

    var registrarUrl = global.getApiUrl() + '/donaciones/crear/';

    var eliminarUrl = global.getApiUrl() + '/donaciones/eliminar/';

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
        $location.path('/libreta')
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


    return {

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

      eliminarDonacion: function (idDonacion) {
        return eliminarDonacion(idDonacion);
      }
    }

  });

