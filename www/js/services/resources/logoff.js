angular.module('donacion')

  .factory('LogoffService', function (global, $q, $resource, $http, $state, localStorageService, $rootScope) {

    var url = global.getApiUrl() + '/cuentas/logout/';

    function logoff() {
      var deferred = $q.defer();
      $http({
        url: url,
        method: "POST"
      }).success(function (response) {
        localStorageService.clearAll();

        // Algoritmo para eliminar los atributos del rootScope creados "artificialmente".
        for (var prop in $rootScope) {
          if (prop.substring(0,1) !== '$') {
            delete $rootScope[prop];
          }
        }

        // Verifico si estoy o no en la sección home
        if ($state.current.name.indexOf('home') >= 0) {
          $state.reload();
        } else {
          $state.transitionTo('home.inicio');
        }


        deferred.resolve();
      });

      return deferred.promise;
    }

    return {
      logoff: function() {
        return logoff();
      }
    }
  });
