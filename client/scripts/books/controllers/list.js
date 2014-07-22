'use strict';

angular.module('Books').controller('books_list', function($scope) {

  $scope.test = 'test';

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl: 'scripts/books/views/list.html',
    controller: 'books_list'
  });
});
