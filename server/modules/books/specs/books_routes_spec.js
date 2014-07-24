'use strict';

describe('Books Get', function() {

  var app_mock = require('../../../mocks/app_mock.js')();
  var Q = require('q');
  var route, path, get;

  beforeEach(function() {
    prepare_backend();
    path = app_mock.app.get.mostRecentCall.args[0];
    get = app_mock.app.get.mostRecentCall.args[1];
  });

  it('should define the /books path for app.get', function() {
    expect(path).toBe('/books');
  });

  describe('When no arguments passed on request', function() {

    it('should call on model get', function(done) {
      spyOn(app_mock.response, 'json').andCallFake(function(response) {
        expect(response.data).toBe('get all');
        done();
      });

      get({}, app_mock.response);
    });

  });

  describe('When id passed on request', function() {

    var request;

    beforeEach(function() {
      request = require('../../../mocks/request_mock.js').new().get();
      request.query = { id: 2 };
    });

    it('should call on model get_one with id', function(done) {
      spyOn(app_mock.response, 'json').andCallFake(function(response) {
        expect(response.data).toBe('get one for id:2');
        done();
      });

      get(request, app_mock.response);
    });

  });

  // ---

  function prepare_backend() {

    var books_model = {
      get: function() {
        return create_promise('get all');
      },
      get_one: function(id) {
        return create_promise('get one for id:' + id);
      }
    };

    spyOn(app_mock.app, 'get');
    route = require('../books_routes.js')(app_mock.app, books_model);

  }

  function create_promise(resolve) {
    var deferred = Q.defer();
    deferred.resolve(resolve);
    return deferred.promise;
  }

});
