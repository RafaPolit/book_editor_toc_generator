'use strict';

angular.module('Directives')
.directive('tabChangeValue', function(){
  return {
    restrict: 'A',
    scope: { tabChangeValue: '=', forwardValue: '=', backwardValue: '=' },
    link: function(scope, element) {
      $(element).on('keydown', function(e) { 
        var keyCode = e.keyCode || e.which; 
        if (keyCode === 9) { 
          e.preventDefault();
          if(!e.shiftKey) {
            scope.tabChangeValue = scope.forwardValue;
            console.log('Tab pressed', scope.tabChangeValue);
          }
          if(e.shiftKey) {
            scope.tabChangeValue = scope.backwardValue;
            console.log('Shift+Tab pressed', scope.tabChangeValue);
          }
          scope.$apply();
        } 
      });
    }
  };
});