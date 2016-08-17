angular.module('donacion')
  .controller('NavHomeController', function ($scope, LoginModal, LogoffService, localStorageService) {

    $scope.currentUser = localStorageService.get('currentUser');
    
    $scope.logoff = function () {
      LogoffService.logoff();
    };

    $scope.openLoginModal = function () {
      LoginModal();
    }
  });
