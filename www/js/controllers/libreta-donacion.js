angular.module('donacion')
  .controller('LibretaController', function ($http, $scope, $uibModal, ProfileService) {
    
    $scope.modalEliminar = function (id) {
      $scope.loading = false;

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
      $scope.loading = false;

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

    $scope.modalVisualizar = function (id) {
      $scope.loading = false;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'templates/donaciones/modal-visualizar-donacion.html',
        size: 'md',
        controller: 'VisualizarDonacionController',
        resolve: {
          idDonacion: function () {
            return id;
          }
        }
      });
    };
  });
