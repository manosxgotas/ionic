/**
 * Created by root on 01/09/16.
 */
angular.module('donacion')
  .controller('CrearSolicitudDonacionController',function ($scope,CentrosDonacionService,PacientesService,CurrentUserService,TiposSolicitudesService,DireccionesService,SolicitudesService,GruposSanguineosService) {
    //Obtengo los centros de donacion
    $scope.centrosDonacion = CentrosDonacionService.query();

    // Obtengo las provincias de la API.
    $scope.provincias = DireccionesService.getProvincias().query();

    // Según la provincia elegida obtengo sus localidades.
    $scope.obtenerLocalidades = function(idprov) {
      $scope.localidades = DireccionesService.getLocalidades(idprov).query();
    };

    //Obtengo los tipos de solicitudes
    $scope.tiposSolicitudes = TiposSolicitudesService.query();
    //Obtengo los grupos sanguineos
    $scope.gruposSanguineos = GruposSanguineosService.query();

    //Objeto que contendra los datos de la solicitud
    $scope.solicitud = {
      paciente: undefined,
    }

    $scope.solicitud.fechaPublicacion = new Date();
    // <---- DatePicker fecha de inicio
    $scope.fechaInicioDPOptions = {
      initDate: new Date(2016, 0, 1),
      minDate: new Date(),
      datepickerMode: 'year'
    };
    $scope.fechaFinDPOptions = {
      initDate: new Date(2016, 0, 1),
      minDate: new Date(),
      datepickerMode: 'year'
    };
    $scope.fechaNacimientoDPOptions = {
      initDate: new Date(1980, 0, 1),
      minDate: new Date(1920,0,1),
      maxDate: new Date(),
      datepickerMode: 'year'
    };
    $scope.fechaDPInicio = {
      opened: false
    };
    $scope.fechaDPFin = {
      opened: false
    };
    $scope.fechaDPNacimiento = {
      opened: false
    };

    $scope.format = "dd/MM/yyyy";

    $scope.openDatePicker = function(picker) {
      if (picker == "fechaInicio")
        $scope.fechaDPInicio.opened = true;
      if (picker == "fechaFin")
        $scope.fechaDPFin.opened = true;
      if (picker == "nacimiento")
        $scope.fechaDPNacimiento.opened = true;
    };

    // DatePicker fecha de nacimiento ---->

    $scope.crearSolicitud = function (video) {
      if ($scope.solicitud.imagenes !== undefined){
        angular.forEach($scope.solicitud.imagenes.files,function (value,key) {
          $scope.solicitud.imagenes[key] = value
        })
      }
   /*  PacientesService.crearPaciente($scope.solicitud).success(function (data,response) {
        $scope.solicitud.paciente = data
        if ($scope.solicitud.video.files[0] != undefined) {
          SolicitudesService.crearSolicitudDonacion($scope.solicitud, $scope.currentUser.registro.id,video)
        }
        else{
          SolicitudesService.crearSolicitudDonacion($scope.solicitud, $scope.currentUser.registro.id)
        }
     })*/

     $scope.solicitud.paciente.id =2
     SolicitudesService.crearSolicitudDonacion($scope.solicitud, $scope.currentUser.registro.id)
 // console.log($scope.solicitud)
//      console.log($scope.solicitud.imagenes)
    }
  })
