'use strict';

angular.module('Books').controller('books_list', function($rootScope, $scope, books) {

  $scope.books = books;

  if($rootScope.book_created) {
    $rootScope.book_created = false;
    $scope.book_just_created = true;
  }

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
