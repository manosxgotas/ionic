angular.module('donacion')
  .controller('RegistroController', function ($http, $scope, RegistroService, DireccionesService) {

    // Inicializo variables

    // Booleano para comprobar si los inputs de confirmación de pass y email son correctos.
    $scope.correoCheck = false;
    $scope.passwordCheck = false;

    // Objeto que contendrá la información del donante a enviar a la API.
    $scope.datosDonante = {
      usuario: undefined,
      donante: undefined,
      direccion: undefined
    };


    // Obtengo las provincias de la API.
    $scope.provincias = DireccionesService.getProvincias().query();


    // Según la provincia elegida obtengo sus localidades.
    $scope.obtenerLocalidades = function(idprov) {
      $scope.localidades = DireccionesService.getLocalidades(idprov).query();
    };


    // Métodos para comprobar si los inputs de confirmación de pass y email son correctos y seteo validez.
    $scope.confirmarCorreo = function (formRegistro, confirmCorreo) {
      if ($scope.datosDonante.usuario.email == confirmCorreo) {
        $scope.correoCheck = true;
        formRegistro.confirmCorreo.$setValidity('checkTrue', true);
      } else {
        $scope.correoCheck = false;
        formRegistro.confirmCorreo.$setValidity('checkTrue', false);
      }
    };

    $scope.confirmarContrasenia = function (formRegistro, confirmContrasenia) {
      if ($scope.datosDonante.usuario.password == confirmContrasenia) {
        $scope.passwordCheck = true;
        formRegistro.confirmContrasenia.$setValidity('checkTrue', true);
      } else {
        $scope.passwordCheck = false;
        formRegistro.confirmContrasenia.$setValidity('checkTrue', false);
      }
    };


    // <---- DatePicker fecha de nacimiento
    $scope.nacimientoDPOptions = {
      initDate: new Date(1950, 0, 1),
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2010, 0, 1)
    };

    $scope.nacimientoDP = {
      opened: false
    };

    $scope.format = "dd/MM/yyyy";

    $scope.openDatePicker = function() {
      $scope.nacimientoDP.opened = true;
    };
    // DatePicker fecha de nacimiento ---->


    $scope.signup = function() {
      RegistroService.registrarse($scope.datosDonante);
    }
  });
