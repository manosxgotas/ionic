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

        if (profile.grupoSanguineo != null) {
            $scope.perfil.gs = profile.grupoSanguineo.nombre;
          }
        $scope.perfil.correo = profile.usuario.email;
        $scope.perfil.peso = profile.peso;
        $scope.perfil.altura = profile.altura;
      })
    })

  });
