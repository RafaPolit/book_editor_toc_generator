'use strict';

describe('format_index_array Filter', function() {
 
  var filter;

  beforeEach(module('Filters'));

  beforeEach(inject(function(formatIndexArrayFilter) {
    filter = formatIndexArrayFilter;
  }));

  it('should return a string of dot-joint numbers', function() {
    var index_array = [ 1, 5, 3, 2 ];

    expect(filter(index_array)).toBe('1.5.3.2');
  });

});