angular.module('donacion')

  .factory('RegistroService', function (global, $http, $filter) {
    var url = global.getApiUrl() + "/cuentas/registro/";

    function registrarse(datosDonante){
      $http({
        url: url,
        dataType: "json",
        method: "POST",

        data: {
          usuario: datosDonante.usuario,
          numeroDocumento: datosDonante.donante.numeroDocumento,
          tipoDocumento: datosDonante.donante.tipoDocumento,
          nacionalidad: datosDonante.donante.nacionalidad,
          telefono: datosDonante.donante.telefono,
          nacimiento: $filter('date')(datosDonante.donante.nacimiento, 'dd/MM/yyyy'),
          grupoSanguineo: datosDonante.donante.gs,
          peso: datosDonante.donante.peso,
          altura: datosDonante.donante.altura,
          genero: datosDonante.donante.genero,
          direccion: datosDonante.direccion
        },

      }).success(function (data) {
        console.log(data);
        console.log('Registro realizado con éxito');
      }).error(function(data) {
        console.log(data)
      });
  }

    return {
      registrarse: function (datosDonante) {
        return registrarse(datosDonante);
      }
    }
  });
