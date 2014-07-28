'use strict';

angular.module('Books').controller('books_create', function($rootScope, $scope, $resource, $location, _, toc_editor) {

  /* --- */
  $scope.sortableOptions = {
    handle: '.drag-handle',
    revert: true
  };

  /* --- */

  $scope.book = { toc: [] };

  toc_editor($scope);

  $scope.create = function() {
    $resource('/books').save(get_sanitized_book()).$promise
    .then(function(response) {
      if(response.action === 'created') {
        $rootScope.book_created = true;
        $location.path('/');
      }
    });
  };

  function get_sanitized_book() {
    var sanitized_toc = sanitize_toc();
    return { title: $scope.book.title || '', toc: sanitized_toc };
  }

  function sanitize_toc() {
    return _($scope.book.toc).chain()
    .reject(function(item) { return item.new_entry; })
    .map(function(item, index) {
      return { order: index + 1, level: item.level, content: item.content || '' };
    })
    .value();
  }

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/create',{
    templateUrl: 'scripts/books/views/create.html',
    controller: 'books_create'
  });
});
