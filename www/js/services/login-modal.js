angular.module('donacion')
  .service('LoginModal', function ($uibModal) {

    return function() {
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/login.html',
        controller: 'LoginController',
        size: 'md'
      });

    }
  });
