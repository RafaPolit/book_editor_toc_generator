'use strict';

angular.module('Filters').filter('formatIndexArray', function() {
  return function (index_array) {
    return index_array.join('.');
  };
});