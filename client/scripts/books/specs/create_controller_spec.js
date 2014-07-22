'use strict';

describe('Books create controller', function () {

  beforeEach(module('Books'));

  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('books_create', {
      $scope: scope,
    });
  }));

  describe('On instance', function() {
    it('should have scope.book.toc as an empty array', function() {
      expect(scope.new_book.toc_children).toEqual([]);
    });

    it('should have a new_toc_entry parent with default values', function() {
      expect(scope.new_toc_entry.title).toBe('');
      expect(scope.new_toc_entry.parent).toBe(scope.new_book);
    });
  });

  describe('Add TOC entry function', function() {

    beforeEach(function() {
      
    });

    it('should push the entry to the assigned TOC parent', function() {
      scope.new_toc_entry.title = 'first level title';
      
      scope.add_toc_entry();

      expect(scope.new_book.toc_children[0]).toEqual({ title: 'first level title', toc_children: [] });

      scope.new_toc_entry.title = 'second level title';
      scope.new_toc_entry.parent = scope.new_book.toc_children[0];
      
      scope.add_toc_entry();

      expect(scope.new_book.toc_children[0].title).toBe('first level title');
      expect(scope.new_book.toc_children[0].toc_children[0]).toEqual({ title: 'second level title', toc_children: [] });

    });

    it('should clear the tilte', function() {
      expect(scope.new_toc_entry.title).toBe('');
    });

  });

});