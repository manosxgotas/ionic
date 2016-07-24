angular.module('donacion')

  .factory('LogoffService', function (global, $resource, $http, $state, localStorageService, $rootScope) {

    function logoff() {
      localStorageService.clearAll();
      $state.transitionTo('home.inicio');

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
