angular.module('donacion')
  
  .controller('GruposController', function($scope, GruposService) {
    
    $scope.grupos = GruposService.query();

  });
