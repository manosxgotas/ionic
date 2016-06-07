angular.module('donacion')
  .controller('NavController', function ($http, $scope, $rootScope, ProfileService, LogoffService) {

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
          });

        } else {
          $scope.nombreUsuario=$rootScope.nombre + ' ' + $rootScope.apellido;
          $scope.fotoUsuario = $rootScope.foto;
        }

        $scope.is_logged = true;


    });

    $scope.logoff = function () {
      LogoffService.logoff();
      $scope.is_logged = false;
    }

  });
