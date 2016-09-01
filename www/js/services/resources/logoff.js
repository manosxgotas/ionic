angular.module('donacion')

  .factory('LogoffService', function (global, $q, $resource, $http, $state, localStorageService, $rootScope) {

    function logoff() {
      var deferred = $q.defer();
      localStorageService.clearAll();

      // Verifico si estoy o no en la sección home
      if ($state.current.name.indexOf('home') >= 0) {
        $state.reload();
      } else {
        $state.transitionTo('home.inicio');
      }

      // Algoritmo para eliminar los atributos del rootScope creados "artificialmente".
      for (var prop in $rootScope) {
        if (prop.substring(0,1) !== '$') {
          delete $rootScope[prop];
        }
      }
      deferred.resolve();
      return deferred.promise;
    }

    return {
      logoff: function() {
        return logoff();
      }
    }
  });
