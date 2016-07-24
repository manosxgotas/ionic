angular.module('donacion')
  .controller('ProfileController', function ($http, $scope, AuthService, ProfileService) {


    AuthService.isLogged(function () {
      $scope.perfil = {};

      var profile = ProfileService.getProfile().get({}, function () {
        $scope.perfil.nombre = profile.usuario.first_name;
        $scope.perfil.apellido = profile.usuario.last_name;
        $scope.perfil.username = profile.usuario.username;
        $scope.perfil.foto = profile.foto;
        $scope.perfil.nacimiento = profile.nacimiento;

        switch (profile.genero) {
          case '1':
            $scope.perfil.sexo = 'Hombre';
            break;
          case '2':
            $scope.perfil.sexo = 'Mujer';
            break;
        }

        $scope.imagenGS = '../img/fondos-perfil/nada1.png';

        if (profile.grupoSanguineo != null) {
          $scope.perfil.gs = profile.grupoSanguineo.nombre;

          switch($scope.perfil.gs) {
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
        }
        $scope.perfil.correo = profile.usuario.email;
        $scope.perfil.peso = profile.peso;
        $scope.perfil.altura = profile.altura;
      })
    })

  });
