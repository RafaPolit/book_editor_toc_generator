'use strict';

describe('TOC index generator', function() {

  var toc_index_generator = require('../toc_index_generator.js');

  it('should not have side effects on original TOC', function() {
    var toc = prepare_toc().brothers;
    toc_index_generator(toc);
    
    expect(toc).toEqual(prepare_toc().brothers);
  });

  it('should order and increase correctly when items are brothers', function() {
    var toc = prepare_toc().brothers;

    expect(toc_index_generator(toc)).toEqual([
      { order: 1, level: 1, index: [ 1 ] },
      { order: 2, level: 1, index: [ 2 ] }
    ]);
  });

  it('should increase correctly when items are sons', function() {
    var toc = prepare_toc().sons;

    expect(toc_index_generator(toc)[3]).toEqual({ order: 4, level: 3, index: [ 1, 1, 2 ] });
  });

  it('should increase correctly when items are parents', function() {
    var toc = prepare_toc().parents;

    expect(toc_index_generator(toc)[3]).toEqual({ order: 4, level: 2, index: [ 1, 2 ] });
  });

  // ------------------------------

  function prepare_toc() {
    return {
      brothers: [
        { order: 2, level: 1 },
        { order: 1, level: 1 }
      ],
      sons: [
        { order: 1, level: 1 },
        { order: 2, level: 2 },
        { order: 3, level: 3 },
        { order: 4, level: 3 }
      ],
      parents: [
        { order: 1, level: 1 },
        { order: 2, level: 2 },
        { order: 3, level: 3 },
        { order: 4, level: 2 }
      ]
    };
  }

});