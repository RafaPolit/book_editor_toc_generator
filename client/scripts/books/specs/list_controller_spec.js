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

  describe('Route provider for: /(root)', function() {

    var route, location, httpBackend;

    beforeEach(inject(function($route, $location, $httpBackend){
      route = $route;
      location = $location;
      httpBackend = $httpBackend;

      route.current = undefined;
    }));

    it('should use books list.html and books_list controller', function() {
      httpBackend.when('GET', 'scripts/books/views/list.html').respond('');
      httpBackend.when('GET', '/books').respond({response:'books'});

      location.path('/');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/books/views/list.html');
      expect(route.current.controller).toBe('books_list');
    });

    it('should resolve books for the controller', inject(function($resource){
      httpBackend.when('GET', '/books').respond({response:'books'});

      route.routes['/'].resolve.books($resource)
      .then(function(books){
        expect(books).toBe('books');
      });

      httpBackend.flush();
    }));

    xit('should redirect to / if resolve fails', inject(function(parents_model){
      httpBackend.when('GET', '/parents').respond({errors:['error']});

      route.routes['/parents'].resolve.parents(parents_model, location);
      spyOn(location, 'path');
      httpBackend.flush();

      expect(location.path).toHaveBeenCalledWith('/');
    }));
  });

});