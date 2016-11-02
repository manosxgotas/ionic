angular.module('donacion')
  .controller('ProfileController', function ($http, $scope, ProfileService, CurrentUserService) {

    $scope.currentUser = CurrentUserService.getCurrentUser().get(function () {
      switch ($scope.currentUser.genero) {
        case '1':
          $scope.currentUser.sexo = 'Hombre';
          break;
        case '2':
          $scope.currentUser.sexo = 'Mujer';
          break;
      }

      if ($scope.currentUser.grupoSanguineo != null) {

        switch($scope.currentUser.grupoSanguineo.nombre) {
          case 'O+':
            $scope.imagenGS = '../img/fondos-perfil/O+.png';
            break;
          case 'A+':
            $scope.imagenGS = '../img/fondos-perfil/A+.png';
            break;
          case 'B+':
            $scope.imagenGS = '../img/fondos-perfil/B+.png';
            break;
          case 'AB+':
            $scope.imagenGS = '../img/fondos-perfil/AB+.png';
            break;
          case 'O-':
            $scope.imagenGS = '../img/fondos-perfil/O-.png';
            break;
          case 'A-':
            $scope.imagenGS = '../img/fondos-perfil/A-.png';
            break;
          case 'B-':
            $scope.imagenGS = '../img/fondos-perfil/B-.png';
            break;
          case 'AB-':
            $scope.imagenGS = '../img/fondos-perfil/AB-.png';
            break;
        }
      } else {
        $scope.imagenGS = '../img/fondos-perfil/nada1.png';
      }
    });
    $scope.updateAvatar = function (avatar) {
      if(avatar) {
        ProfileService.updateAvatar(avatar.file)
      }
    }


  });
