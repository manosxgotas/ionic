angular.module('donacion')

  .factory('PacientesService', function ($http,$filter, global) {

    var crearURL = global.getApiUrl() + '/solicitudes/crear-paciente/';

    function crearPaciente(solicitud) {

     return $http({
          url: crearURL,
          dataType: "json",
          method: 'POST',
          data: {
          id : solicitud.idPaciente,
          nombre: solicitud.paciente.nombre,
          apellido: solicitud.paciente.apellido,
          email: solicitud.paciente.email,
          nacimiento: $filter('date')(solicitud.paciente.nacimiento, 'dd/MM/yyyy'),
          telefono: solicitud.paciente.telefono,
          genero: solicitud.paciente.genero,
          direccion: solicitud.paciente.direccion
        },
      }).success(function (data, response) {
          console.log("Paciente creado con éxito")
     })
        error(function (response, data) {


      })
}


    return {
      crearPaciente: function (solicitud) {
        return crearPaciente(solicitud);
      }
    }



  });
