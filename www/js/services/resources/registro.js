angular.module('donacion')

  .factory('RegistroService', function (global, $http) {
    var url = global.getApiUrl() + "/cuentas/registro/";

    function registrarse(datosDonante){
      $http({
        url: url,
        dataType: "json",
        method: "POST",

        data: {
          usuario: datosDonante.usuario,
          telefono: datosDonante.donante.telefono,
          nacimiento: datosDonante.donante.nacimiento,
          grupoSanguineo: datosDonante.donante.gs,
          peso: datosDonante.donante.peso,
          altura: datosDonante.donante.altura,
          genero: datosDonante.donante.genero,
          direccion: datosDonante.direccion,
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
