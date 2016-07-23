angular.module('donacion')

  .factory('AuthService', function (global, $http, $rootScope, $state, localStorageService, ProfileService) {

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
          setCookie(authdata);
          var profile = ProfileService.getProfile().get({}, function () {
            $rootScope.nombre = profile.usuario.first_name;
            $rootScope.apellido = profile.usuario.last_name;
            $rootScope.nombreUsuario = $rootScope.nombre + ' ' + $rootScope.apellido;
            $rootScope.foto = profile.foto;
          });
        $rootScope.is_logged = true;
        $state.transitionTo('dashboard');
        $rootScope.$emit('isLoggedEvent', [true]);
        console.log($rootScope)
        }).error(function (data) {
        console.log(data);
      });
    }

    function setCookie(authdata) {
      var token = ' JWT ' + authdata;
      localStorageService.set('Token', token);
      $http.defaults.headers.common['Authorization'] = token;
      return token;
    }

    function isLogged(callback) {
      var token = localStorageService.get('Token');
      var url = global.getApiUrl() + "/cuentas/verificar-token/";

      if (token == undefined) {
        $rootScope.$emit('isLoggedEvent', [false]);
        $state.transitionTo('home.inicio');
      } else {
        var authdata = token.substring(5);
        $http({
          url: url,
          dataType: "json",
          method: "POST",
          data: {
            token: authdata,
          }

        }).success(function () {
          getAuth(token);
          $rootScope.$emit('isLoggedEvent', [true]);
          if (typeof callback === "function") {
            callback();
          }
        }).error(function () {
          $rootScope.$emit('isLoggedEvent', [false]);
          console.log("El token de autentificación es inválido");
          $state.transitionTo('home.inicio');
        });
      }
    }

    function getAuth(token){
      $http.defaults.headers.common['Authorization'] = token;
      return token;
    }

    return {
      login : function(credentials) {
        return getToken(credentials);
      },

      isLogged : function (callback) {
        return isLogged(callback);
      }
    }

  });
