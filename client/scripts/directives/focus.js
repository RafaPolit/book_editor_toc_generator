'use strict';

angular.module('Directives').directive('focus', function(){
  return function(scope, element, attrs) {
    var target = $('#'+attrs.focus);
    $(target).focus();
  };
});