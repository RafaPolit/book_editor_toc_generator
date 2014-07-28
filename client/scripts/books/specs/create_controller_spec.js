'use strict';

describe('Books create controller', function () {

  beforeEach(module('Books'));

  var scope, toc_editor_service;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    toc_editor_service = jasmine.createSpy('toc_editor_service');

    $controller('books_create', {
      $scope: scope,
      toc_editor: toc_editor_service
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
      scope.book = prepare_edited_toc();
      scope.sanitize_book = jasmine.createSpy('sanitize_book');
      httpBackend = $httpBackend;
    }));

    it('should call on books/create post with the correct (sanitized book) data', function() {
      var sanitized_book = expected_sanitized_book();

      httpBackend.expectPOST('/books/create', sanitized_book).respond({ action: 'created' });
      
      scope.create();
      httpBackend.flush();
    });

    it('should emit a creation_success event', function() {
      httpBackend.expectPOST('/books/create').respond({ action: 'created' });

      var emitted = false;
      scope.$on('creation_success', function() {
        emitted = true;
      });

      scope.create();
      httpBackend.flush();

      expect(emitted).toBe(true);
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

  // ---

  function prepare_edited_toc() {
    return {
      toc: [
        { level: 1, content: 'Content' },
        { new_entry: true },
        { level: 2, should_not_send: true }
      ]
    };
  }

  function expected_sanitized_book() {
    return { title: '', toc: [
      { order: 1, level: 1, content: 'Content' }, { order: 2, level: 2, content: '' }
    ]};
  }

});