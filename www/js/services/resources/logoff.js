angular.module('donacion')

  .factory('LogoffService', function (global, $resource, $http, $state, localStorageService, $rootScope) {

    function logoff() {
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
    }

    return {
      logoff: function() {
        return logoff();
      }
    }
  });
