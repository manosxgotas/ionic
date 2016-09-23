angular.module('donacion')

  .service('APIInterceptor', function (localStorageService, $q, $location) {
    var service = this;
    service.request = function(config) {
      var token = localStorageService.get('Token');

      if (token && !config.headers.authorization) {
        config.headers.authorization = token;
      }

      return config;
    };
    service.responseError = function (rejection) {

      if(rejection.status === 404) {
        $location.path("/404nf");
      }

      return $q.reject(rejection);
    }
  });
