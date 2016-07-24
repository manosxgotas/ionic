angular.module('donacion')

  .factory('global', function() {

    var apiUrl = 'localhost:8000/api';

    function getApiUrl() {
      return 'https://' + apiUrl;
    }

    return {
      getApiUrl: function () {
        return getApiUrl();
      }

    }
  });
