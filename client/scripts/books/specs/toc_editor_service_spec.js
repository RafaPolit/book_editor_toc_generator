'use strict';

describe('Books TOC editor service', function() {

  beforeEach(module('Books'));

  beforeEach(module(function ($provide) {
    $provide.value('drag_and_drop', jasmine.createSpy('drag_and_drop'));
  }));

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

    describe('Drag and drop', function() {
      it('should call on drag_and_drop service', inject(function(drag_and_drop) {
        expect(drag_and_drop).toHaveBeenCalledWith(scope);
      }));
    });
  });

  describe('Add entry', function() {
    beforeEach(function() {
      spyOn(scope, 'sanitize_toc').andCallThrough();
      scope.book.toc[6].content = 'New entry';
      scope.add_entry();
    });

    it('should add the current new_entry to the TOC', function() {
      expect(scope.book.toc[6]).toEqual({ level: 2, content: 'New entry', index: [ 3, 2 ] });
    });

    it('should increment the new_entry index and clear the content', function() {
      expect(scope.book.toc[7]).toEqual({ new_entry: true, level: 2, content: '', index: [ 3, 3 ] });
    });

    it('should call the sanitize method', function() {
      expect(scope.sanitize_toc).toHaveBeenCalled();
    });
  });

  describe('Edit functions', function() {
    describe('edit_entry_start Function', function() {

      beforeEach(function() {
        scope.book.toc[1].editing = true;
        scope.edit_entry_start(scope.book.toc[2]);
      });
      
      it('should set the item editing to true and clear all others', function() {
        expect(scope.book.toc[1].editing).toBe(false);
        expect(scope.book.toc[2].editing).toBe(true);
      });

      it('should store the actual status on initial_status', function() {
        expect(scope.initial_status.level).toBe(scope.book.toc[2].level);
        expect(scope.initial_status.content).toBe(scope.book.toc[2].content);
      });
    });

    describe('edit_entry', function() {

      beforeEach(function() {
        spyOn(scope, 'sanitize_toc');
        spyOn(scope, 'assign_new_entry_data');
        scope.book.toc[2].editing = true;
        scope.edit_entry(scope.book.toc[2]);
      });

      it('should set the toc_entry editing property to false', function() {
        expect(scope.book.toc[2].editing).toBe(false);
      });

      it('should call the sanitize method', function() {
        expect(scope.sanitize_toc).toHaveBeenCalled();
      });

      it('should call the assign_new_entry_data method', function() {
        expect(scope.assign_new_entry_data).toHaveBeenCalled();
      });
    });

    describe('edit_entry_cancel', function() {

      beforeEach(function() {
        spyOn(scope, 'sanitize_toc');
        spyOn(scope, 'assign_new_entry_data');
        scope.initial_status = { level: 8, content: 'previous' };
        scope.edit_entry_cancel(scope.book.toc[2]);
      });

      it('should restore the initial status and remove it', function() {
        expect(scope.book.toc[2].level).toBe(8);
        expect(scope.book.toc[2].content).toBe('previous');
        expect(scope.book.toc[2].editing).toBe(false);
        expect(scope.initial_status).toBeUndefined();
      });

      it('should call the sanitize method', function() {
        expect(scope.sanitize_toc).toHaveBeenCalled();
      });
      
      it('should call the assign_new_entry_data method', function() {
        expect(scope.assign_new_entry_data).toHaveBeenCalled();
      });
    });
  });


  describe('Remove entry', function() {
    beforeEach(function() {
      spyOn(scope, 'sanitize_toc').andCallThrough();
      scope.remove_entry(scope.book.toc[4]);
    });

    it('should remove the selected entry from the TOC', function() {
      expect(scope.book.toc[4].content).toBe('Content 3.1.');
    });

    it('should recalculate the new_entry index', function() {
      expect(scope.book.toc[5].index).toEqual([ 2, 3 ]);
    });

    it('should call the sanitize method', function() {
      expect(scope.sanitize_toc).toHaveBeenCalled();
    });
  });

  describe('Sanitize TOC', function() {
    beforeEach(function() {
      scope.book.toc[0].level = 6;
      scope.book.toc.splice(4, 0, { level: 3, content: 'Content 2.1.2.', index: [ 2, 1, 2 ] });
      scope.book.toc.splice(3, 0, { level: 1, content: 'New 3.', index: [ 3 ] });
      scope.book.toc.splice(4, 0, { level: -2, content: 'New Entry!!!!', index: [ 4 ], new_entry: true });

      scope.sanitize_toc();
    });

    it('should ensure valid levels and indexes, disregarding new_entry', function() {
      expect(scope.book.toc[0].level).toBe(1);
      expect(scope.book.toc[3].level).toBe(1);
      expect(scope.book.toc[3].index).toEqual([ 3 ]);
      expect(scope.book.toc[5].level).toBe(2);
      expect(scope.book.toc[5].index).toEqual([ 3, 1 ]);
      expect(scope.book.toc[6].level).toBe(3);
      expect(scope.book.toc[6].index).toEqual([ 3, 1, 1]);
    });
  });

  describe('Level editing functions', function() {

    describe('Indent function', function() {
      it('should reduce last digit and append an extra digit', function() {
        scope.indent({ item: scope.book.toc[4], index: 4 });

        expect(scope.book.toc[4].level).toBe(2);
        expect(scope.book.toc[4].index).toEqual([ 2, 2 ]);
        
        scope.indent({ item: scope.book.toc[4], index: 4 });
        expect(scope.book.toc[4].index).toEqual([ 2, 1, 2 ]);
      });

      it('should not increase if on first element of TOC', function() {
        scope.book.toc[6].level = 1;
        scope.book.toc[6].index = [ 1 ];
        scope.book.toc = [ scope.book.toc[6] ];

        scope.indent({ item: scope.book.toc[0], index: 0 });

        expect(scope.book.toc[0].level).toBe(1);
        expect(scope.book.toc[0].index).toEqual([ 1 ]);
      });

      it('should only allow one level beyond previous TOC entry', function() {
        scope.indent({ item: scope.book.toc[6], index: 6 });
        scope.indent({ item:  scope.book.toc[6], index: 6 });

        expect(scope.book.toc[6].level).toBe(3);
        expect(scope.book.toc[6].index).toEqual([ 3, 1, 1 ]);
      });
    });

    describe('Dedent function', function() {
      it('should remove last digit and increment the next-to-last', function() {
        scope.dedent(scope.book.toc[3]);

        expect(scope.book.toc[3].level).toBe(2);
        expect(scope.book.toc[3].index).toEqual([ 2, 2 ]);
      });

      it('should not decrease if on first level', function() {
        scope.dedent(scope.book.toc[1]);

        expect(scope.book.toc[1].level).toBe(1);
        expect(scope.book.toc[1].index).toEqual([ 2 ]);
      });

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