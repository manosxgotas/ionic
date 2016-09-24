angular.module('donacion')
  .filter('FiltroGruposSanguineos', function(){
    return function(input,filtro){

      var out = []
      if (filtro != undefined) {

        angular.forEach(input, function (valor, clave) {
          angular.forEach(filtro, function (value, key) {
            if (valor.gruposSanguineos.indexOf(value) >= 0) {
              if (out.indexOf(valor) == -1) {
                out.push(valor)
              }
            }
          })
        })
        return out;
      } else{
        return input;
      }

    }

  })
