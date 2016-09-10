angular.module('donacion')

  .factory('SolicitudesService', function (global, $http, $resource, $state, $filter, localStorageService, CurrentUserService) {

    var crearURL = global.getApiUrl() + '/solicitudes/crear/'

    function crearSolicitudDonacion(solicitud,idDonante,video) {
      return  $http({
                  url: crearURL,
              //    type: 'json',
                  method: 'POST',
                  data: {
                    id : solicitud.id,
                    titulo: solicitud.titulo,
                    fechaPublicacion: $filter('date')(solicitud.fechaPublicacion, 'dd/MM/yyyy'),
                    donantesNecesarios: solicitud.donantesNecesarios,
                    fechaHoraInicio: $filter('date')(solicitud.fechaInicio, 'dd/MM/yyyy')+ ' ' + $filter('date')(solicitud.horaInicio, 'HH:mm'),
                    fechaHoraFin: $filter('date')(solicitud.fechaFin, 'dd/MM/yyyy')+ ' ' + $filter('date')(solicitud.horaFin, 'HH:mm'),
                    tipo: solicitud.idTipoSolicitud,
                    centroDonacion: solicitud.idCentroDonacion,
                    paciente: solicitud.paciente.id,
                    donante: idDonante,
                    video: video,
                    gruposSanguineo : solicitud.gs,
                    imagenes : solicitud.imagenes
                  },
                  headers: {'Content-Type': undefined},

                  transformRequest: function (data) {
                    if (data === undefined) return data;
                    var fd = new FormData();
                    fd.append();
                    angular.forEach(data, function (value, key) {
                      if (value !== null && value !== undefined) {
                        if (value instanceof File) {
                          fd.append(key,value)
                        }
                      }
                      /*
                      if (value instanceof File) {
                        console.log(key+value)
                        fd.append(key, value);
                      }else{
                        fd.append(key, angular.toJson(value));
                      }*/
                    });
                    return fd;
                  }
            }).success(function (response,data) {
              console.log('La solicitud se creo con éxito')
            }).error(function (response, data) {
              console.log(data)
              console.log("La creación de la solicitud fallo")

      })
    }
      return {
        crearSolicitudDonacion: function () {
          // crearSolicitudDonacion(donacion, idRegistro)
          if (arguments[0].video.files[0] == undefined) {
            crearSolicitudDonacion(arguments[0], arguments[1]);
            return;
          } else {
            // crearSolicitudDonacion(donacion, idRegistro, videoDonacion)
            crearSolicitudDonacion(arguments[0], arguments[1], arguments[0].video.files[0].file);
            return;
          }
        }
      }


  })
