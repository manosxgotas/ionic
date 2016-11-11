angular.module('donacion')

  .factory('AuthService', function (global, $http, ngNotify, $resource, $q, $rootScope, $state, LogoffService, localStorageService) {

    function loginSocial(token, provider) {
      var url = global.getApiUrl() + "/cuentas/social/" + provider + "/";
      $http({
        url: url,
        dataType: "json",
        method: "POST",
        data: {
          access_token: token
        }
      }).success(function (response) {
        var authdata = response.token;
        ngNotify.set(
          '¡Hola de nuevo ' + response.user.first_name + '!',
          'info'
        );
        setToken(authdata);
        $state.transitionTo('dashboard.perfil');

      }).error(function (error) {
        if (typeof error === 'object') {
          angular.forEach(error, function (valor, campo) {
            ngNotify.set(
              '<span class="fa fa-key"></span>&nbsp; ' + campo + ': ' + valor,
              'warn'
            );
          });
        } else {
          ngNotify.set(
            '<span class="fa fa-key"></span>&nbsp; ' + error,
            'warn'
          );
        }
      });
    }

    function accountActivateKey(key) {
      var url = global.getApiUrl() + "/cuentas/activar-cuenta-clave/";
      $http({
        url: url,
        dataType: "json",
        method: "POST",
        data: {
          clave: key
        }
      }).success(function (response) {
        ngNotify.set(
          '<span class="fa fa-refresh"></span>&nbsp; ' + response.mensaje,
        {
          type: 'info',
          sticky: true
        });
        $state.transitionTo('home.inicio')
      }).error(function (error) {
        if (typeof error === 'object') {
          angular.forEach(error, function (valor, campo) {
            ngNotify.set(
              '<span class="fa fa-key"></span>&nbsp; ' + campo + ': ' + valor,
              'warn'
            );
          });
        } else {
          ngNotify.set(
            '<span class="fa fa-key"></span>&nbsp; ' + error,
            'warn'
          );
        }
      });
    }

    function accountActivateLink() {
      var url = global.getApiUrl() + "/cuentas/activar-cuenta-link/:token";
      return $resource(
        url,
        { token: '@_token' },
        {
          query: {
            method: 'GET',
            isArray: false
          }
        });
    }

    function resetPassRequest(email) {
      var url = global.getApiUrl() + "/cuentas/reset-pass-request/";
      $http({
        url: url,
        dataType: "json",
        method: "POST",
        data: {
          email: email
        }
      }).success(function (response) {
        ngNotify.set(
          '<span class="fa fa-paper-plane"></span>&nbsp; ' + response.mensaje,
          {
            type: 'info',
            sticky: true
          }
        );
      }).error(function (error) {
        if (typeof error === 'object') {
          angular.forEach(error, function (valor, campo) {
            ngNotify.set(
              '<span class="fa fa-key"></span>&nbsp; ' + campo + ': ' + valor,
              'warn'
            );
          });
        } else {
          ngNotify.set(
            '<span class="fa fa-key"></span>&nbsp; ' + error,
            'warn'
          );
        }
      });
    }

    function resetPassToken() {
      var url = global.getApiUrl() + "/cuentas/reset-pass-token/:token";
      return $resource(
        url,
        { token: '@_token' },
        {
          query: {
            method: 'GET',
            isArray: false
          }
        });
    }

    function resetPass(pass1, pass2, token) {
      var url = global.getApiUrl() + "/cuentas/reset-pass/";
      $http({
        url: url,
        dataType: "json",
        method: "POST",
        data: {
          password: pass1,
          password2: pass2,
          token: token
        }
      }).success(function (response) {
        ngNotify.set(
          '<span class="fa fa-refresh"></span>&nbsp; ' + response.mensaje,
          {
            type: 'info',
            sticky: true
          }
        );
        $state.transitionTo('home.inicio')
      }).error(function (error) {
        if (typeof error === 'object') {
          angular.forEach(error, function (valor, campo) {
            ngNotify.set(
              '<span class="fa fa-key"></span>&nbsp; ' + campo + ': ' + valor,
              'warn'
            );
          });
        } else {
          ngNotify.set(
            '<span class="fa fa-key"></span>&nbsp; ' + error,
            'warn'
          );
        }
      });
    }

    function getToken(credentials) {
      var deferred = $q.defer();
      var url = global.getApiUrl() + "/cuentas/login/";
      $http({
        url: url,
        dataType: "json",
        method: "POST",
        data: {
          email: credentials.email,
          password: credentials.password,
        }
      }).success(function (response) {
        deferred.resolve();
        ngNotify.set(
          '¡Hola de nuevo ' + response.user.first_name + '!',
          'info'
        );
        var authdata = response.token;
        setToken(authdata);
        $state.transitionTo('dashboard.perfil');
      }).error(function (error) {
        deferred.reject();
        if (typeof error === 'object') {
          angular.forEach(error, function (valor, campo) {
            ngNotify.set(
              '<span class="fa fa-key"></span>&nbsp; ' + campo + ': ' + valor,
              'warn'
            );
          });
        } else {
          ngNotify.set(
            '<span class="fa fa-key"></span>&nbsp; ' + error,
            'warn'
          );
        }
      });
      return deferred.promise;
    }

    function setToken(authdata) {
      var token = ' JWT ' + authdata;
      localStorageService.set('Token', token);
    }

    function isLogged() {
      var deferred = $q.defer();

      var token = localStorageService.get('Token');

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
          deferred.resolve();

        }).error(function () {
          deferred.reject("El token de autentificación es inválido")
        });
      }
      return deferred.promise;
    }


    return {
      login : function(credentials) {
        return getToken(credentials);
      },

      loginSocial: function (token, provider) {
        return loginSocial(token, provider)
      },

      isLogged : function () {
        return isLogged();
      },

      accountActivateKey: function (key) {
        return accountActivateKey(key)
      },

      accountActivateLink: function () {
        return accountActivateLink()
      },

      resetPassRequest: function (email) {
        return resetPassRequest(email)
      },

      resetPass: function (pass1, pass2, token) {
        return resetPass(pass1, pass2, token)
      },

      resetPassToken: function () {
        return resetPassToken()
      }

    }

  });
