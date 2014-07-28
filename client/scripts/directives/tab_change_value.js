'use strict';

angular.module('Directives')
.directive('tabChangeValue', function(){
  return {
    restrict: 'A',

    scope: {
      tabChangeValue: '=',
      tabFunction: '=',
      tabFunctionArguments: '=',
      shiftTabFunction: '=',
      shiftTabFunctionArguments: '='
    },

    link: function(scope, element) {
      $(element).on('keydown', function(e) { 
        var keyCode = e.keyCode || e.which; 
        if (keyCode === 9) { 
          e.preventDefault();
          if(!e.shiftKey) {
            scope.tabFunction(scope.tabFunctionArguments);
          }
          if(e.shiftKey) {
            scope.shiftTabFunction(scope.shiftTabFunctionArguments);
          }
          scope.$apply();
        } 
      });
    }
  };
});