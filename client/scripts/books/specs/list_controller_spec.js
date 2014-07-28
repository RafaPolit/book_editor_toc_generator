'use strict';

describe('Books create controller', function () {

  beforeEach(module('Books'));

  var scope;
  var books;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    books = { };
    instantiate_controller();
  }));


  describe('on instance', function() {
    it('should have books on scope', function() {
      expect(scope.books).toBe(books);
    });

    describe('When book_created', function() {
      it('should store book_just_created and reset book_created', inject(function($rootScope) {
        $rootScope.book_created = true;
        instantiate_controller();

        expect($rootScope.book_created).toBe(false);
        expect(scope.book_just_created).toBe(true);
      }));
    });

    describe('When book_updated', function() {
      it('should store book_just_updated and reset book_updated', inject(function($rootScope) {
        $rootScope.book_updated = true;
        instantiate_controller();

        expect($rootScope.book_updated).toBe(false);
        expect(scope.book_just_updated).toBe(true);
      }));
    });
  });

  describe('Route provider for: /(root)', function() {

    var route, location, httpBackend;

    beforeEach(inject(function($route, $location, $httpBackend){
      route = $route;
      location = $location;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/books/views/list.html').respond('');
      httpBackend.when('GET', '/books').respond({ data: 'books' });
    }));

    it('should use books list.html and books_list controller', function() {
      location.path('/');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/books/views/list.html');
      expect(route.current.controller).toBe('books_list');
    });

    it('should resolve books for the controller', inject(function($resource){
      route.routes['/'].resolve.books($resource)
      .then(function(books){
        expect(books).toBe('books');
      });

      httpBackend.flush();
    }));

  });

  // ---

  function instantiate_controller() {
    inject(function($controller) {
      $controller('books_list', {
        $scope: scope,
        books: books
      });
    });
  }

});