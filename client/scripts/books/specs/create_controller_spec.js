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
      expect(scope.new_book.toc).toEqual([]);
    });

    it('should have a new_toc_entry object with default values', function() {
      expect(scope.new_toc_entry.title).toBe('');
      expect(scope.new_toc_entry.order).toBe(0);
      expect(scope.new_toc_entry.level).toBe(0);
    });
  });

  describe('Add entry function', function() {

    beforeEach(function() {
      scope.new_toc_entry.title = 'new_title';
      scope.new_toc_entry.order = 1;
      scope.new_toc_entry.level = 2;
      
      scope.add_entry();
    });

    it('should add the entry to the TOC, but not a binded copy', function() {
      expect(scope.new_book.toc[0]).toEqual({ title: 'new_title', order: 1, level: 2 });
      expect(scope.new_book.toc[0]).not.toBe(scope.new_toc_entry);
    });

    it('should clear the tilte', function() {
      expect(scope.new_toc_entry.title).toBe('');
    });

    it('should increment the new entry order (without affecting previous toc entries)', function() {
      expect(scope.new_toc_entry.order).toBe(2);
    });

  });

});