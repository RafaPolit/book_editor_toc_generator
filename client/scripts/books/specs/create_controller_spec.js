'use strict';

describe('Books create controller', function () {

  beforeEach(module('Books'));

  var scope, toc_editor_service;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    toc_editor_service = jasmine.createSpy('toc_editor_service');
    var sanitize_book_service = function(book) {  return (book === scope.book) ? 'sanitized_book' : 'error'; };

    $controller('books_create', {
      $scope: scope,
      toc_editor: toc_editor_service,
      sanitize_book: sanitize_book_service
    });
  }));

  describe('On instance', function() {
    it('should have New Book TOC as an empty array', function() {
      expect(scope.book.toc).toEqual([]);
    });

    it('should call on toc_editor_service with scope passed as argument', function() {
      expect(toc_editor_service).toHaveBeenCalledWith(scope);
    });
  });

  describe('Create function', function() {

    var httpBackend;

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
    }));

    it('should call on books/ post with the correct (sanitized book) data', function() {
      httpBackend.expectPOST('/books', 'sanitized_book').respond({ action: 'created' });
      
      scope.create();
      httpBackend.flush();
    });

    describe('On creation success', function() {

      var location;

      beforeEach(inject(function($location) {
        httpBackend.expectPOST('/books').respond({ action: 'created' });

        location = $location;
        spyOn(location, 'path');

        scope.create();
        httpBackend.flush();
      }));
      
      it('should store book_created in rootScope', inject(function($rootScope) {
        expect($rootScope.book_created).toBe(true);
      }));

      it('should redirect to /', function() {
        expect(location.path).toHaveBeenCalledWith('/');
      });
    });

  });

  describe('Route provider for: /books/create', function() {

    var route, location, httpBackend;

    beforeEach(inject(function($route, $location, $httpBackend){
      route = $route;
      location = $location;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/books/views/create.html').respond('');
    }));

    it('should use books create.html and books_create controller', function() {
      location.path('/books/create');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/books/views/create.html');
      expect(route.current.controller).toBe('books_create');
    });

  });

});