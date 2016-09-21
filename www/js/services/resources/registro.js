angular.module('donacion')

  .factory('RegistroService', function (global, $http, $state, ngNotify) {
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

      }).success(function (response) {
        ngNotify.set(
          '¡Bienvenido a <b>Manos por gotas</b> ' + response.user.first_name + '!',
          'info'
        );
        $state.transitionTo('home.registro-exito');

      }).error(function(response) {
        angular.forEach(response, function (valor, clave) {
          ngNotify.set(
            '<span class="fa fa-warning"></span>&nbsp; ' + valor,
            'warn'
          );
        });
      });
  }

    return {
      registrarse: function (donante) {
        return registrarse(donante);
      }
    }
  });
