angular.module('donacion')

  .factory('AuthService', function (global, $http, $q, $rootScope, $state, LogoffService, localStorageService, ProfileService) {

    function getToken(credentials) {
      var url = global.getApiUrl() + "/cuentas/token/";
      $http({
        url: url,
        dataType: "json",
        method: "POST",
        data: {
          username: credentials.username,
          password: credentials.password,
        }
      }).success(function (response) {
        var authdata = response.token;
        setToken(authdata);
        setCurrentUser().then(function () {
          $state.transitionTo('dashboard.perfil');
        });

      }).error(function (data) {
        console.log(data);
      });
    }

    function setToken(authdata) {
      var token = ' JWT ' + authdata;
      localStorageService.set('Token', token);
    }

    function isLogged() {
      var deferred = $q.defer();

      var token = localStorageService.get('Token');
      var currentUser = localStorageService.get('currentUser');

      if (!token) {

        deferred.reject("El token no existe")

      } else {
        var url = global.getApiUrl() + "/cuentas/verificar-token/";
        var authdata = token.substring(5);

        $http({
          url: url,
          dataType: "json",
          method: "POST",
          data: {
            token: authdata
          }

        }).success(function () {
          if (!currentUser) {
            setCurrentUser().then(function () {
              deferred.resolve();
            });
          } else {
            deferred.resolve();
          }

        }).error(function () {
          deferred.reject("El token de autentificación es inválido")
        });
      }
      return deferred.promise;
    }

    function setCurrentUser() {
      var deferred = $q.defer();
      var currentUser = ProfileService.getProfile().get({}, function () {
        localStorageService.set('currentUser', currentUser);
        deferred.resolve();
      });

      return deferred.promise;
    }

    return {
      login : function(credentials) {
        return getToken(credentials);
      },

      isLogged : function () {
        return isLogged();
      }
    }

  });
