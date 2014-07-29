'use strict';

angular.module('Books').controller('books_show', function($rootScope, $scope, $resource, $location, book) {

  $scope.book = book;

  $scope.remove = function() {
    $resource('/books').delete({ id: $scope.book.id }).$promise
    .then(function(response) {
      if(response.action === 'removed') {
        $rootScope.book_removed = true;
        $location.path('/');
      }
    });
  };

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/show/:id',{
    templateUrl: 'scripts/books/views/show.html',
    controller: 'books_show',
    resolve: {
      book: function($resource, $route) {
        return $resource('/books').get({ id: $route.current.params.id }).$promise
        .then(function(response) { return response.data; });
      }
    }
  });
});
