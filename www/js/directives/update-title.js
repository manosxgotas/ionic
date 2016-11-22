angular.module('donacion')
   .directive('title', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {

          $timeout(function() {
            $rootScope.title = (toState.data && toState.data.title)
              ? toState.data.title
              : 'Manos por gotas';
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
