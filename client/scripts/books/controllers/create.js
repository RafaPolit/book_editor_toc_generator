'use strict';

angular.module('Books').controller('books_create', function() {

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/create',{
    templateUrl: 'scripts/books/views/create.html',
    controller: 'books_create'
  });
});
