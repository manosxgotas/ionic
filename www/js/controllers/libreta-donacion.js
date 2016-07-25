angular.module('donacion')
  .controller('LibretaController', function ($http, $scope, $uibModal, AuthService, ProfileService) {


    AuthService.isLogged(function () {

      $scope.perfil = ProfileService.getProfile().get();

      $scope.str2date = function (date) {
        return moment(date, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY');
      };

      $scope.str2time = function (date) {
        return moment(date, 'DD/MM/YYYY HH:mm').format('HH:mm')
      };

      $scope.abrirModal = function (id) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'templates/donaciones/modal-eliminar-donacion.html',
          size: 'md',
          controller: 'EliminarDonacionController',
          resolve: {
            idDonacion: function () {
              return id;
            }
          }
        });
      };
    })
  });
