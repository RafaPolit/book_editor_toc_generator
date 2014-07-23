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
            console.log(scope);
            scope.tabFunction();
            console.log('Tab pressed', scope.tabChangeValue);
          }
          if(e.shiftKey) {
            scope.shiftTabFunction();
            console.log('Shift+Tab pressed', scope.tabChangeValue);
          }
          scope.$apply();
        } 
      });
    }
  };
});