'use strict';

angular.module('Books').controller('books_create', function($rootScope, $scope, $resource, $location, _, toc_editor, sanitize_book) {

  $scope.book = { toc: [] };

  toc_editor($scope);

  $scope.create = function() {
    $resource('/books').save(sanitize_book($scope.book)).$promise
    .then(function(response) {
      if(response.action === 'created') {
        $rootScope.book_created = true;
        $location.path('/');
      }
    });
  };

})
.config(function ($routeProvider) {
  $routeProvider
  .when('/books/create',{
    templateUrl: 'scripts/books/views/create.html',
    controller: 'books_create'
  });
});
