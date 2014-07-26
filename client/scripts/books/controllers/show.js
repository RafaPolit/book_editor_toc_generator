'use strict';

angular.module('Books').controller('books_show', function($scope, book) {

  $scope.book = book;

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/show/:id',{
    templateUrl: 'scripts/books/views/show.html',
    controller: 'books_show',
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
