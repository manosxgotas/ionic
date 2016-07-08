angular.module('donacion')
  .controller('LibretaController', function ($http, $scope, AuthService, ProfileService) {


    AuthService.isLogged(function () {

      $scope.perfil = ProfileService.getProfile().get();

      $scope.str2date = function (date) {
        return moment(date, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY');
      };

      $scope.str2time = function (date) {
        return moment(date, 'DD/MM/YYYY HH:mm').format('HH:mm')
      };
    })
  });
