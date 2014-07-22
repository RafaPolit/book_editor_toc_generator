'use strict';

angular.module('Books').controller('books_create', function($scope, _) {

  $scope.new_book = { toc: [] };
  $scope.new_toc_entry = { title: '', order: 0, level: 0 };

  $scope.add_entry = function() {
    $scope.new_book.toc.push(_($scope.new_toc_entry).clone());
    $scope.new_toc_entry.title = '';
    $scope.new_toc_entry.order ++;
  };

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/create',{
    templateUrl: 'scripts/books/views/create.html',
    controller: 'books_create'
  });
});
