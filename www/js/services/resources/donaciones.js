angular.module('donacion')

  .factory('DonacionesService', function (global, $http, $location, $filter) {

    var url = global.getApiUrl() + '/donaciones/crear/';

    function registrarDonacion(donacion, idRegistro, foto) {

      $http({
        url: url,
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
      }
    }

  });

