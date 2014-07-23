'use strict';

angular.module('Directives')
.directive('tabChangeValue', function(){
  return {
    restrict: 'A',
    scope: { tabChangeValue: '=', tabFunction: '=', shiftTabFunction: '=' },
    link: function(scope, element) {
      $(element).on('keydown', function(e) { 
        var keyCode = e.keyCode || e.which; 
        if (keyCode === 9) { 
          e.preventDefault();
          if(!e.shiftKey) {
            scope.tabFunction();
          }
          if(e.shiftKey) {
            scope.shiftTabFunction();
          }
          scope.$apply();
        } 
      });
    }
  };
});