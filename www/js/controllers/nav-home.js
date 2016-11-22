angular.module('donacion')
  .controller('NavHomeController', function ($scope, LoginModal, LogoffService, $uibModal) {

    $scope.logoff = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/logoff.html',
        size: 'md',
        controller: 'LogoffController'
      });
    };

    $scope.openLoginModal = function () {
      LoginModal();
    };

    $scope.openRegistroModal = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'templates/cuentas/registro.html',
        size: 'md',
        controller: 'RegistroController'
      });
    };

      var dropdown = $('.dropdown-menu');
      var alter = $('.alter-option');
      var navHome = $("#navbar-home-collapse");
      dropdown.on("click", "a", null, function () {
        navHome.removeClass('in');
      });

      alter.on("click", "a", null, function () {
        navHome.removeClass('in');
      });
  });
