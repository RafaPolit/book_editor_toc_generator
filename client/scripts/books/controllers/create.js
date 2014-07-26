'use strict';

angular.module('Books').controller('books_create', function($scope, _) {

  $scope.book = { toc: [] };
  $scope.new_toc_entry = { title: '', order: 1, level: 1, index: [ 1 ] };

  $scope.add_toc_entry = function() {
    $scope.book.toc.push(JSON.parse(JSON.stringify($scope.new_toc_entry)));
    $scope.new_toc_entry.title = '';
    $scope.new_toc_entry.order += 1;
    $scope.new_toc_entry.index[$scope.new_toc_entry.index.length-1] += 1;
  };

  $scope.indent = function() {
    if(_($scope.book.toc).size()) {
      var last_toc = _($scope.book.toc).last();
      $scope.new_toc_entry.level = last_toc.level + 1;
      $scope.new_toc_entry.index = JSON.parse(JSON.stringify(last_toc.index));
      $scope.new_toc_entry.index.push(1);
    }
  };

  $scope.dedent = function() {
    $scope.new_toc_entry.level = Math.max(1, $scope.new_toc_entry.level - 1);

    if(_($scope.new_toc_entry.index).size() > 1) {
      $scope.new_toc_entry.index = _($scope.new_toc_entry.index).initial();
      $scope.new_toc_entry.index[$scope.new_toc_entry.index.length-1] += 1;
    }
  };

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/create',{
    templateUrl: 'scripts/books/views/create.html',
    controller: 'books_create'
  });
});
