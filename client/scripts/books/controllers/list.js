'use strict';

angular.module('Books').controller('books_list', function($rootScope, $scope, $resource, books) {

  $scope.books = books;

  $scope.actions = {};

  set_alerts('created');
  set_alerts('updated');
  set_alerts('removed');

  $scope.remove = function(id) {
    $resource('/books').delete({ id: id }).$promise
    .then(function(response) {
      if(response.action === 'removed') {
        $scope.actions.book_just_removed = true;
        return $resource('/books').get().$promise;
      }
    })
    .then(function(response) {
      $scope.books = response.data;
    });
  };

  function set_alerts(action) {
    if($rootScope['book_' + action]) {
      $rootScope['book_' + action] = false;
      $scope.actions['book_just_' + action] = true;
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

