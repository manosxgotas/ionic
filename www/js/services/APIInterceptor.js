angular.module('donacion')

  .service('APIInterceptor', function (localStorageService) {
    var service = this;
    service.request = function(config) {
      var token = localStorageService.get('Token');

      if (token && !config.headers.authorization) {
        config.headers.authorization = token;
      }

      return config;
    };
    service.responseError = function(response) {
      return response;
    };
  });
