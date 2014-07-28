'use strict';

describe('Dran and Drop service', function() {

  beforeEach(module('Books'));

  var scope, drag_and_drop;

  beforeEach(inject(function ($rootScope, _drag_and_drop_) {
    scope = $rootScope.$new();
    drag_and_drop = _drag_and_drop_(scope);
  }));

  describe('On instance', function() {
    it('should add the sortableOptions to the scope with default options', function() {
      expect(scope.sortableOptions).toBeDefined();
      expect(scope.sortableOptions.handle).toBe('.drag-handle');
    });
  });

  describe('Drag update function', function() {
    it('should store the dropindex on drag', function() {
      var ui_mock = { item: { sortable: { dropindex: 2 } } };
      scope.sortableOptions.update(null, ui_mock);

      expect(scope.drop_index).toBe(2);
    });
  });

  describe('Drag stop function', function() {
    beforeEach(function() {
      scope.assign_dragged_level = jasmine.createSpy('assign_dragged_level');
      scope.sanitize_toc = jasmine.createSpy('sanitize_toc');
      scope.assign_new_entry_data = jasmine.createSpy('assign_new_entry_data');
      scope.sortableOptions.stop();
    });
    
    it('should call on assign_dragged_position', function() {
      expect(scope.assign_dragged_level).toHaveBeenCalled();
    });
    it('should call on sanitize_toc', function() {
      expect(scope.sanitize_toc).toHaveBeenCalled();
    });
    it('should call on assign_new_entry_data', function() {
      expect(scope.assign_new_entry_data).toHaveBeenCalled();
    });
  });

  describe('Drag scenarios', function() {
    describe('When dragging to pos 0', function() {
      it('should assign dragged item to level 1', function() {
        scope.book = { toc: toc_after_drag_examples().on_pos_0 };
        scope.drop_index = 0;

        scope.assign_dragged_level();

        expect(scope.book.toc[0].level).toBe(1);
      });
    });

    describe('When dragging in between brothers', function() {
      it('should assign item level as brothers', function() {
        scope.book = { toc: toc_after_drag_examples().between_brothers };
        scope.drop_index = 1;

        scope.assign_dragged_level();

        expect(scope.book.toc[1].level).toBe(2);
      });
    });

    describe('When dragging between father and son', function() {
      it('should assign item level as son', function() {
        scope.book = { toc: toc_after_drag_examples().between_father_and_son };
        scope.drop_index = 2;

        scope.assign_dragged_level();

        expect(scope.book.toc[2].level).toBe(3);
      });
    });

    describe('When dragging between son and father', function() {
      it('should assign item level as son', function() {
        scope.book = { toc: toc_after_drag_examples().between_son_and_father };
        scope.drop_index = 4;

        scope.assign_dragged_level();

        expect(scope.book.toc[4].level).toBe(3);
      });
    });
  });

  // ---

  function toc_after_drag_examples() {
    return {
      on_pos_0: [
        { level: 2, content: 'Content 2.1.', index: [ 2, 1 ] },
        { level: 1, content: 'Content 1.', index: [ 1 ] },
      ],
      between_brothers: [
        { level: 2, content: 'Content 1.', index: [ 1.1 ] },
        { level: 4, content: 'Content 2.1.1.', index: [ 2, 1, 1, 1 ] },
        { level: 2, content: 'Content 2.', index: [ 1.2 ] },
      ],
      between_father_and_son: [
        { level: 1, content: 'Content 2.', index: [ 2 ] },
        { level: 2, content: 'Content 2.1.', index: [ 2, 1 ] },
        { level: 1, content: 'Content 1.', index: [ 1 ] },
        { level: 3, content: 'Content 2.1.1.', index: [ 2, 1, 1 ] },
      ],
      between_son_and_father: [
        { level: 1, content: 'Content 1.', index: [ 1 ] },
        { level: 1, content: 'Content 2.', index: [ 2 ] },
        { level: 2, content: 'Content 2.1.', index: [ 2, 1 ] },
        { level: 3, content: 'Content 2.1.1.', index: [ 2, 1, 1 ] },
        { level: 1, content: 'Content 4.', index: [ 4 ] },
        { level: 1, content: 'Content 3.', index: [ 3 ] },
      ]
    };
  }

});