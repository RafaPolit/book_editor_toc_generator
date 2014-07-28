'use strict';

angular.module('Books').controller('books_list', function($rootScope, $scope, books) {

  $scope.books = books;

  set_alerts('created');
  set_alerts('updated');

  function set_alerts(action) {
    if($rootScope['book_' + action]) {
      $rootScope['book_' + action] = false;
      $scope['book_just_' + action] = true;
    }
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

