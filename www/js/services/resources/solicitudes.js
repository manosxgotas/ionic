angular.module('donacion')

  .factory('SolicitudesService', function (global, $http, $resource, $state, $filter, ngNotify) {

    var crearUrl = global.getApiUrl() + '/solicitudes/crear/';
    var listadoUrl = global.getApiUrl() + '/solicitudes/listado-solicitudes/';
    var infoUrl = global.getApiUrl() + '/solicitudes/:id';
    var solicitudesDonanteUrl = global.getApiUrl() + '/solicitudes/listado-solicitudes-donante/';
    var eliminarUrl = global.getApiUrl() + '/solicitudes/eliminar/';
    var solicitudesCompatiblesUrl = global.getApiUrl() + '/solicitudes/solicitudes-compatibles/';

    function crearSolicitudDonacion(data) {
      return $http({
        url: crearUrl,
        method: 'POST',
        data: data,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity

      }).success(function () {
        ngNotify.set(
          '<span class="fa fa-medkit"></span>&nbsp; La solicitud se creó con éxito',
          'info'
        );
        $state.transitionTo('dashboard.listado-solicitudes').then(function () {
          $state.reload();
        })
      }).error(function (error) {
        if (typeof error === 'object') {
          angular.forEach(error, function (valor, campo) {
            ngNotify.set(
              '<span class="fa fa-medkit"></span>&nbsp; ' + campo + ': ' + valor,
              'warn'
            );
          });
        } else {
          ngNotify.set(
            '<span class="fa fa-medkit"></span>&nbsp; ' + error,
            'warn'
          );
        }
      });
    }

    function listadoSolicitudes(pagina) {
      var listadoSolicitudesUrl = listadoUrl;
      if(pagina){
        listadoSolicitudesUrl += '?page=' + pagina;
      }
      return $resource(
        listadoSolicitudesUrl,
        {},
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }

    function infoSolicitud() {
      return $resource(
        infoUrl,
        {id: '@_id'},
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }

    function obtenerCantidadSolicitudesCompatibles() {
      return $resource(
        solicitudesCompatiblesUrl,
        {},
        {
          query: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }

    function solicitudesDonante(pagina) {
      var listadoSolicitudesUrl = solicitudesDonanteUrl;
      if(pagina){
        listadoSolicitudesUrl += '?page=' + pagina;
      }
      return $resource(
        listadoSolicitudesUrl,
          {},
          {
            query: {
              method: 'GET',
              isArray: false
            }
          }
      );
    }
    function eliminarSolicitud(idSolicitud) {
      $http({
        url: eliminarUrl + idSolicitud,
        method: 'DELETE'
      }).success(function () {
        ngNotify.set(
            '<span class="fa fa-trash"></span>&nbsp; ¡Se ha eliminado correctamente tu solicitud!',
            'info'
        );
        $state.reload()
      }).error(function(error) {
        ngNotify.set(
          '<span class="fa fa-trash"></span>&nbsp; ' + error,
          'warn'
        );
      })
    }

    return {
      crearSolicitudDonacion: function (solicitud) {
        var fd = new FormData();
        if (solicitud.historia == undefined) {
          solicitud.historia = '';
        }

        var data = {
          titulo: solicitud.titulo,
          fechaPublicacion: $filter('date')(solicitud.fechaPublicacion, 'dd/MM/yyyy'),
          donantesNecesarios: solicitud.donantesNecesarios,
          fechaHoraInicio: $filter('date')(solicitud.fechaInicio, 'dd/MM/yyyy') + ' ' + $filter('date')(solicitud.horaInicio, 'HH:mm'),
          fechaHoraFin: $filter('date')(solicitud.fechaFin, 'dd/MM/yyyy') + ' ' + $filter('date')(solicitud.horaFin, 'HH:mm'),
          tipo: solicitud.idTipoSolicitud,
          centroDonacion: solicitud.idCentroDonacion,
          grupos: solicitud.gruposSanguineos,
          historia: solicitud.historia,
          paciente: {
            nombre: solicitud.paciente.nombre,
            apellido: solicitud.paciente.apellido,
            nacimiento: $filter('date')(solicitud.paciente.nacimiento, 'yyyy-MM-dd'),
            telefono: solicitud.paciente.telefono,
            email: solicitud.paciente.email,
            genero: solicitud.paciente.genero,
            grupoSanguineo: solicitud.paciente.grupoSanguineo,
            direccion: {
              numero: solicitud.paciente.direccion.numero,
              calle: solicitud.paciente.direccion.calle,
              piso: solicitud.paciente.direccion.piso,
              numeroDepartamento: solicitud.paciente.direccion.numeroDepartamento,
              localidad: solicitud.paciente.direccion.localidad
            }
          }
        };
        angular.forEach(data, function (valor, clave) {
          if (typeof  valor == 'object') {
            fd.append(clave, JSON.stringify(valor))
          } else {
            fd.append(clave, valor)
          }
        });
        if (solicitud.video.files[0] !== undefined) {
          fd.append('video', solicitud.video.files[0].file)
        }
        if (solicitud.imagenes.files !== undefined) {
          angular.forEach(solicitud.imagenes.files, function (imagen, clave) {
            fd.append('imagenes', imagen.file)
          });
        }
        crearSolicitudDonacion(fd);
        return
      },

      obtenerCantidadSolicitudesCompatibles: function () {
        return obtenerCantidadSolicitudesCompatibles()
      },

      listadoSolicitudes: function (pagina) {
        return listadoSolicitudes(pagina);

      },
      infoSolicitud: function () {
        return infoSolicitud();
      },
      solicitudesDonante: function(pagina){
        return solicitudesDonante(pagina);
      },
      eliminarSolicitud: function (idSolicitud) {
        return eliminarSolicitud(idSolicitud);
      }
    }
  });
