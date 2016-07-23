angular.module('donacion')
  .controller('NavDashboardController', function ($http, $scope, $rootScope, $sce, ProfileService, LogoffService, DonacionesService) {

    $rootScope.$on('isLoggedEvent', function(args) {

      $scope.is_logged = false;
      $scope.nombreUsuario = null;
      $scope.fotoUsuario = null;

        if (!$rootScope.nombre || $rootScope == undefined){
          ProfileService.getProfile().get({},function(data){
            console.log(data);
            $rootScope.nombre = data.usuario.first_name;
            $rootScope.apellido = data.usuario.last_name;
            $rootScope.foto = data.foto;
            $scope.nombreUsuario=$rootScope.nombre + ' ' + $rootScope.apellido;
            $scope.fotoUsuario = $rootScope.foto;
            DonacionesService.getDiasProxDonacion().get({}, function (data) {
              $rootScope.diasProxDonacion = data.dias;
            })
          });

        } else {
          $scope.nombreUsuario=$rootScope.nombre + ' ' + $rootScope.apellido;
          $scope.fotoUsuario = $rootScope.foto;
          DonacionesService.getDiasProxDonacion().get({}, function (data) {
            $rootScope.diasProxDonacion = data.dias;
          })
        }

        $scope.is_logged = true;

    });

    $scope.logoff = function () {
      LogoffService.logoff();
      $scope.is_logged = false;
    }

  });
