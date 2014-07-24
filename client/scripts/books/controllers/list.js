'use strict';

angular.module('Books').controller('books_list', function($scope, books) {

  $scope.books = books;

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl: 'scripts/books/views/list.html',
    controller: 'books_list',
    resolve: {
      books: function($resource){
        return $resource('/books').get().$promise
        .then(function(response) {
          return response.data;
        });
      }
    }
  });
});
