'use strict';

describe('underscore service', function () {

  beforeEach(module('underscore'));

  it('should have standard underscore methods', inject(function (_) {
    expect(_([1, 2, 3]).contains(2)).toBe(true);
    expect(_([1, 2, 3]).contains(4)).toBe(false);
  }));

  it('should use underscore noConflict', function () {
    expect(window._).toBeUndefined();
  });

});
