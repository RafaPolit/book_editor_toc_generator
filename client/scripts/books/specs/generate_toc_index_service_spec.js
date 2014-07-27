'use strict';

describe('TOC index generator', function() {

  beforeEach(module('Books'));

  var generate_toc_index;

  beforeEach(inject(function (_generate_toc_index_) {
    generate_toc_index = _generate_toc_index_;
  }));

  it('should increase correctly when items are brothers', function() {
    var toc = prepare_toc().brothers;
    generate_toc_index(toc);

    expect(toc[0]).toEqual({ level: 1, index: [ 1 ] });
    expect(toc[1]).toEqual({ level: 1, index: [ 2 ] });
  });

  it('should increase correctly when items are sons', function() {
    var toc = prepare_toc().sons;
    generate_toc_index(toc);
    
    expect(toc[3]).toEqual({ level: 3, index: [ 1, 1, 2 ] });
  });

  it('should increase correctly when items are parents', function() {
    var toc = prepare_toc().parents;
    generate_toc_index(toc);

    expect(toc[3]).toEqual({ level: 2, index: [ 1, 2 ] });
  });

  // ------------------------------

  function prepare_toc() {
    return {
      brothers: [ { level: 1 }, { level: 1 } ],
      sons: [ { level: 1 }, { level: 2 }, { level: 3 }, { level: 3 } ],
      parents: [ { level: 1 }, { level: 2 }, { level: 3 }, { level: 2 } ]
    };
  }

});