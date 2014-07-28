'use strict';

describe('Books edit controller', function () {

  beforeEach(module('Books'));

  var scope, toc_editor_service;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    toc_editor_service = jasmine.createSpy('toc_editor_service');
    var sanitize_book_service = function(book) {  return (book === scope.book) ? 'sanitized_book' : 'error'; };

    $controller('books_edit', {
      $scope: scope,
      book: { title: 'resolved book', toc: [ { item: '1' } ]},
      toc_editor: toc_editor_service,
      sanitize_book: sanitize_book_service
    });
  }));

  describe('On instance', function() {
    it('should have TOC as book toc', function() {
      expect(scope.book.toc).toEqual([ { item: '1' } ]);
    });

    it('should call on toc_editor_service with scope passed as argument', function() {
      expect(toc_editor_service).toHaveBeenCalledWith(scope);
    });
  });

  describe('Update function', function() {

    var httpBackend;

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
    }));

    it('should call on books/ put with the correct (sanitized book) data', function() {
      httpBackend.expectPUT('/books', 'sanitized_book').respond({ action: 'updated' });
      
      scope.update();
      httpBackend.flush();
    });

    describe('On update success', function() {

      var location;

      beforeEach(inject(function($location) {
        httpBackend.expectPUT('/books').respond({ action: 'created' });

        location = $location;
        spyOn(location, 'path');

        scope.update();
        httpBackend.flush();
      }));
      
      it('should store book_updated in rootScope', inject(function($rootScope) {
        expect($rootScope.book_updated).toBe(true);
      }));

      it('should redirect to /', function() {
        expect(location.path).toHaveBeenCalledWith('/');
      });
      
    });

  });

  describe('Route provider for: /books/edit/:id', function() {

    var route, location, httpBackend;

    beforeEach(inject(function($route, $location, $httpBackend){
      route = $route;
      location = $location;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/books/views/edit.html').respond('');
      httpBackend.when('GET', '/books?id=2').respond({ data: 'book' });

      location.path('/books/edit/2');
    }));

    it('should use books edit.html and books_edit controller', function() {
      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/books/views/edit.html');
      expect(route.current.controller).toBe('books_edit');
    });

    it('should resolve book for the controller', inject(function($resource){
      route.routes['/books/edit/:id'].resolve.book($resource, { current: { params: { id: '2' } } })
      .then(function(book){
        expect(book).toBe('book');
      });

      httpBackend.flush();
    }));

  });

});