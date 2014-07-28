'use strict';

describe('Books create controller', function () {

  beforeEach(module('Books'));

  var scope;
  var book;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    book = { id: 2 };

    $controller('books_show', {
      $scope: scope,
      book: book
    });
  }));

  describe('on instance', function() {
    it('should have books on scope', function() {
      expect(scope.book).toBe(book);
    });
  });

  describe('Remove function', function() {

    var httpBackend;

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
    }));

    it('should call on books/ del with the book id', function() {
      httpBackend.expectDELETE('/books?id=2').respond({ action: 'removed' });
      
      scope.remove();
      httpBackend.flush();
    });

    describe('On remove success', function() {

      var location;

      beforeEach(inject(function($location) {
        httpBackend.expectDELETE('/books?id=2').respond({ action: 'removed' });

        location = $location;
        spyOn(location, 'path');

        scope.remove();
        httpBackend.flush();
      }));
      
      it('should store book_removed in rootScope', inject(function($rootScope) {
        expect($rootScope.book_removed).toBe(true);
      }));

      it('should redirect to /', function() {
        expect(location.path).toHaveBeenCalledWith('/');
      });
    });

  });

  describe('Route provider for: /books/:id', function() {

    var route, location, httpBackend;

    beforeEach(inject(function($route, $location, $httpBackend){
      route = $route;
      location = $location;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/books/views/show.html').respond('');
      httpBackend.when('GET', '/books?id=2').respond({ data: 'book 2' });
      location.path('/books/show/2');
    }));

    it('should use books show.html and books_show controller', function() {
      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/books/views/show.html');
      expect(route.current.controller).toBe('books_show');
    });

    it('should resolve book for the controller', inject(function($resource){
      route.routes['/books/show/:id'].resolve.book($resource, { current: { params: { id: '2' } } })
      .then(function(books){
        expect(books).toBe('book 2');
      });

      httpBackend.flush();
    }));

  });

});