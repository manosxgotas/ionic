angular.module('donacion')

  .factory('RegistroService', function (global, $http, $state, ngNotify, $q) {
    var url = global.getApiUrl() + "/cuentas/registro/";

    function registrarse(donante){
      var deferred = $q.defer();
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
        deferred.resolve();
        ngNotify.set(
          '¡Bienvenido a <b>Manos por gotas</b> ' + response.user.first_name + '!',
          'info'
        );
        $state.transitionTo('home.registro-exito');

      }).error(function(error) {
        deferred.reject();
        angular.forEach(error, function (valor, campo) {
          ngNotify.set(
            '<span class="fa fa-warning"></span>&nbsp; ' + campo + ': ' + valor,
            'warn'
          );
        });
      });
      return deferred.promise;
  }

    return {
      registrarse: function (donante) {
        return registrarse(donante);
      }
    }
  });
