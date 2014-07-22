'use strict';

angular.module('Books').controller('books_create', function($scope) {

  $scope.new_book = { toc_children: [] };
  $scope.new_toc_entry = { title: '', parent: $scope.new_book };

  $scope.add_toc_entry = function() {
    $scope.new_toc_entry.parent.toc_children.push({
      title: $scope.new_toc_entry.title,
      toc_children: []
    });
  };

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/create',{
    templateUrl: 'scripts/books/views/create.html',
    controller: 'books_create'
  });
});
