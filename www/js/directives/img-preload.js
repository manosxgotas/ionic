angular.module('donacion')
  .directive('imgPreload', ['$rootScope', function() {
  return {
    restrict: 'A',
    scope: {
      ngSrc: '@'
    },
    link: function(scope, element, attrs) {
      element.on('load', function() {
        element.removeClass('hide');
        element.removeClass('spinner-hide');
        element.addClass('spinner-show');
        element.parent().find('span').remove();
      }).on('error', function() {

      });

      scope.$watch('ngSrc', function(newVal) {
        element.addClass('hide');
        element.addClass('spinner-hide');
      });
    }
  };
}]);
