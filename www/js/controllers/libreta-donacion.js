angular.module('donacion')
  .controller('LibretaController', function ($http, $scope, $uibModal, AuthService, ProfileService) {


    AuthService.isLogged(function () {

      $scope.perfil = ProfileService.getProfile().get();

      $scope.str2date = function (date) {
        return moment(date).format('DD/MM/YYYY');
      };

      $scope.str2time = function (date) {
        return moment(date).format('HH:mm')
      };

      $scope.modalEliminar = function (id) {

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

      $scope.modalVerificar = function (id) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'templates/donaciones/modal-verificar-donacion.html',
          size: 'md',
          controller: 'VerificarDonacionController',
          resolve: {
            idDonacion: function () {
              return id;
            }
          }
        });
      };

    })
  });
