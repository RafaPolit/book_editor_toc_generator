'use strict';

describe('Books create controller', function () {

  beforeEach(module('Books'));

  var scope;
  var books;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    books = { };

    $controller('books_list', {
      $scope: scope,
      books: books
    });
  }));

  describe('on instance', function() {
    it('should have books on scope', function() {
      expect(scope.books).toBe(books);
    });
  });

  describe('Route provider for: /(root)', function() {

    var route, location, httpBackend;

    beforeEach(inject(function($route, $location, $httpBackend){
      route = $route;
      location = $location;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/books/views/list.html').respond('');
      httpBackend.when('GET', '/books').respond({response:'books'});
    }));

    it('should use books list.html and books_list controller', function() {
      location.path('/');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/books/views/list.html');
      expect(route.current.controller).toBe('books_list');
    });

    it('should resolve books for the controller', inject(function($q, $resource){
      route.routes['/'].resolve.books($resource)
      .then(function(books){
        expect(books.response).toBe('books');
      });

      httpBackend.flush();
    }));

  });

});