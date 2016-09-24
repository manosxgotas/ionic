angular.module('donacion')

  .factory('SolicitudesService', function (global, $http, $resource, $state, $filter, localStorageService, CurrentUserService) {

    var crearUrl = global.getApiUrl() + '/solicitudes/crear/'
    var listadoUrl = global.getApiUrl() + '/solicitudes/listado-solicitudes/'
    var infoUrl = global.getApiUrl() + '/solicitudes/:id'

    function crearSolicitudDonacion(data) {
      return  $http({
                  url: crearUrl,
                 //type: 'json',
                  method: 'POST',
                  data: data,
                  headers: {'Content-Type': undefined},


                transformRequest: angular.identity

            }).success(function (response,data) {
              console.log('La solicitud se creo con éxito')
            }).error(function (response, data) {
              console.log(data)
              console.log("La creación de la solicitud fallo")

      })
    }

    function listadoSolicitudes() {
      return $resource(listadoUrl)
    }

    function infoSolicitud(){
      return $resource(
        infoUrl,
        { id: '@_id' },
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }
      return {
        crearSolicitudDonacion: function (solicitud,idDonante) {
          var fd = new FormData();

          var data = {
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
              grupos : solicitud.gruposSanguineos,
          }
          angular.forEach(data,function(valor,clave){
            if (typeof  valor == 'object' ) {
              fd.append(clave,JSON.stringify(valor))
            }else{
              fd.append(clave,valor)
            }
          })
          if (solicitud.video.files[0] !== undefined){
            console.log(solicitud.video.files[0].file)
            fd.append('video',solicitud.video.files[0].file)
          }
          if (solicitud.imagenes.files !== undefined){
            var imagenes = []
            angular.forEach(solicitud.imagenes.files,function (valor,clave) {
              imagenes.push(valor.file)
            })
            fd.append('imagenes',JSON.stringify(imagenes))
          }
          crearSolicitudDonacion(fd)
          return
        },

        listadoSolicitudes: function () {
          return listadoSolicitudes();

        },
        infoSolicitud: function () {
          return infoSolicitud();
        }
      }

  })
