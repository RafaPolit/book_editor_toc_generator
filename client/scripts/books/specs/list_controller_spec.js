'use strict';

describe('Books create controller', function () {

  beforeEach(module('Books'));

  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('books_list', {
      $scope: scope,
    });
  }));

  describe('on instance', function() {
    it('should have scope.test', function() {
      expect(scope.test).toBe('test');
    });
  });

});