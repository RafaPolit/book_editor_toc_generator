'use strict';

describe('Books TOC editor service', function() {

  beforeEach(module('Books'));

  var scope, toc_editor;

  beforeEach(inject(function ($rootScope, _toc_editor_) {
    scope = $rootScope.$new();
    scope.book = { toc: toc_example() };
    toc_editor = _toc_editor_(scope);
  }));

  describe('On instance', function() {

    it('should add the creation TOC object to the TOC array', function() {
      expect(scope.book.toc[6]).toEqual({ level: 2, content: '', index: [ 3, 2 ], new_entry: true });
      expect(scope.book.toc[5]).toBe(scope.book.toc[5]);
    });

    describe('When original TOC is empty', function() {
      it('should add the basic creation toc to the TOC array', inject(function(_, _toc_editor_) {
        scope.book.toc = [];
        toc_editor = _toc_editor_(scope);

        expect(scope.book.toc[0]).toEqual({ level: 1, content: '', index: [ 1 ], new_entry: true });
      }));
    });

  });

  describe('Add entry', function() {
    it('should add the current new_entry to the TOC and increment the new_entry accordingly', function() {
      scope.book.toc[6].content = 'New entry';
      scope.add_entry();

      expect(scope.book.toc[6]).toEqual({ level: 2, content: 'New entry', index: [ 3, 2 ] });
      expect(scope.book.toc[7]).toEqual({ new_entry: true, level: 2, content: '', index: [ 3, 3 ] });
    });

    it('should call the sanitize method', function() {
      spyOn(scope, 'sanitize_toc');
      scope.add_entry();

      expect(scope.sanitize_toc).toHaveBeenCalled();
    });
  });

  describe('Sanitize TOC', function() {

    it('should ensure valid levels and indexes, disregarding new_entry', function() {
      scope.book.toc.splice(4, 0, { level: 3, content: 'Content 2.1.2.', index: [ 2, 1, 2 ] });
      scope.book.toc.splice(3, 0, { level: 1, content: 'New 3.', index: [ 3 ] });
      scope.book.toc.splice(4, 0, { level: -2, content: 'New Etnry!!!!', index: [ 4 ], new_entry: true });

      scope.sanitize_toc();

      expect(scope.book.toc[0].level).toBe(1);
      expect(scope.book.toc[3].level).toBe(1);
      expect(scope.book.toc[3].index).toEqual([ 3 ]);
      expect(scope.book.toc[5].level).toBe(2);
      expect(scope.book.toc[5].index).toEqual([ 3, 1 ]);
      expect(scope.book.toc[6].level).toBe(3);
      expect(scope.book.toc[6].index).toEqual([ 3, 1, 1]);
    });

  });



  // ---

  function toc_example() {
    return [
      { level: 1, content: 'Content 1.', index: [ 1 ] },
      { level: 1, content: 'Content 2.', index: [ 2 ] },
      { level: 2, content: 'Content 2.1.', index: [ 2, 1 ] },
      { level: 3, content: 'Content 2.1.1.', index: [ 2, 1, 1 ] },
      { level: 1, content: 'Content 3.', index: [ 3 ] },
      { level: 2, content: 'Content 3.1.', index: [ 3, 1 ] },
    ];
  }

});