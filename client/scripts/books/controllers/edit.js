'use strict';

angular.module('Books').controller('books_edit', function($rootScope, $scope, $resource, $location, _, book, toc_editor, sanitize_book) {

  $scope.book = book;

  toc_editor($scope);

  $scope.update = function() {
    $resource('/books', null, { update: { method: 'PUT'}})
    .update(sanitize_book($scope.book))
    .$promise
    .then(function(response) {
      if(response.action === 'updated') {
        $rootScope.book_updated = true;
        $location.path('/');
      }
    });
  };

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/edit/:id',{
    templateUrl: 'scripts/books/views/edit.html',
    controller: 'books_edit',
    resolve: {
      book: function($resource, $route) {
        return $resource('/books').get({ id: $route.current.params.id }).$promise
        .then(function(response) {
          return response.data;
        });
      }
    }
  });
});
