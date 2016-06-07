angular.module('donacion')
  .controller('ProfileController', function ($http, $scope, AuthService, ProfileService) {


    AuthService.isLogged(function () {
      $scope.perfil = {};

      var profile = ProfileService.getProfile().get({}, function () {
        console.log(profile);
        $scope.perfil.nombre = profile.usuario.first_name;
        $scope.perfil.apellido = profile.usuario.last_name;
        $scope.perfil.username = profile.usuario.username;
        $scope.perfil.foto = profile.foto;
        $scope.perfil.nacimiento = profile.nacimiento;
        $scope.perfil.gs = profile.grupoSanguineo.nombre;
        $scope.perfil.correo = profile.usuario.email;
      })
    })

  });
