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
    it('should have New Book TOC as an empty array', function() {
      expect(scope.book.toc).toEqual([]);
    });

    it('should have a new TOC entry with default values', function() {
      expect(scope.new_toc_entry.title).toBe('');
      expect(scope.new_toc_entry.order).toBe(1);
      expect(scope.new_toc_entry.level).toBe(1);
      expect(scope.new_toc_entry.index).toEqual([ 1 ]);
    });
  });

  describe('Add TOC entry function', function() {

    beforeEach(function() {
      scope.new_toc_entry.title = 'first level title';
      scope.new_toc_entry.order = 5;
      scope.new_toc_entry.level = 4;
      scope.new_toc_entry.index = [ 1, 2, 3, 4 ];
      scope.add_toc_entry();
    });

    it('should push the new entry to the book TOC', function() {
      expect(scope.book.toc[0].title).toBe('first level title');
      expect(scope.book.toc[0].order).toBe(5);
      expect(scope.book.toc[0].level).toBe(4);
      expect(scope.book.toc[0].index).toEqual([ 1, 2, 3, 4 ]);
    });

    it('should increment the order and index automatically', function() {
      expect(scope.new_toc_entry.order).toBe(6);
      expect(scope.new_toc_entry.index).toEqual([ 1, 2, 3, 5 ]);

    });

    it('should clear the tilte', function() {
      expect(scope.new_toc_entry.title).toBe('');
    });

  });

  describe('Increase level function', function() {
    it('should not increase if TOC is still empty', function() {
      scope.indent();
      expect(scope.new_toc_entry.level).toBe(1);
    });

    it('should only allow one level beyond last TOC entry', function() {
      scope.book.toc.push({ level: 3, index: [ 1, 1 ] });

      scope.indent();
      expect(scope.new_toc_entry.level).toBe(4);
      expect(scope.new_toc_entry.index).toEqual([ 1, 1, 1 ]);

      scope.indent();
      expect(scope.new_toc_entry.level).toBe(4);
      expect(scope.new_toc_entry.index).toEqual([ 1, 1, 1 ]);
    });

    it('should use the last toc index and append an extra digit', function() {
      scope.book.toc.push({ index: [ 1, 2, 3, 3 ] });
      scope.indent();

      expect(scope.new_toc_entry.index).toEqual([ 1, 2, 3, 3, 1 ]);
    });

  });

  describe('Decrease level function', function() {
    it('should never decrease bellow 1', function() {
      scope.new_toc_entry.level = 2;

      scope.dedent();
      expect(scope.new_toc_entry.level).toBe(1);

      scope.dedent();
      expect(scope.new_toc_entry.level).toBe(1);
    });

    it('should increase the next-to-last number of the index', function() {
      scope.book.toc.push({ });
      scope.new_toc_entry.index = [ 1, 2, 3, 4 ];
      scope.dedent();

      expect(scope.new_toc_entry.index).toEqual([ 1, 2, 4 ]);
    });

    it('should not increase the next-to-last number of the index for root numbers', function() {
      scope.book.toc.push({ });
      scope.new_toc_entry.index = [ 3 ];
      scope.dedent();

      expect(scope.new_toc_entry.index).toEqual([ 3 ]);
    });

  });

  describe('Index to string function', function() {
    it('should return an index string out of a string array', function() {
      expect(scope.index_to_string([ 1, 5 ])).toBe('1.5');
    });
  });

});