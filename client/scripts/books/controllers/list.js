'use strict';

angular.module('Books').controller('books_list', function() {

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/',{
    templateUrl: 'scripts/books/views/list.html',
    controller: 'books_list'
  });
});
