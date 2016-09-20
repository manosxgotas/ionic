angular.module('donacion')

  .factory('RegistroService', function (global, $http, $state) {
    var url = global.getApiUrl() + "/cuentas/registro/";

    function registrarse(donante){
      $http({
        url: url,
        dataType: "json",
        method: "POST",

        data: {
          email: donante.email,
          email2: donante.confirmCorreo,
          password1: donante.password,
          first_name: donante.first_name,
          last_name: donante.last_name,
          genero: donante.genero
        }

      }).success(function (data) {
        console.log(data);
        console.log('Registro realizado con éxito');
        $state.transitionTo('home.registro-exito');

      }).error(function(data) {
        console.log(data);
        console.log('hubo un error en el registro');
      });
  }

    return {
      registrarse: function (donante) {
        return registrarse(donante);
      }
    }
  });
