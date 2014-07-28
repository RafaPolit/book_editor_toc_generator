'use strict';

describe('Books routes', function() {

  var app_mock = require('../../../mocks/app_mock.js')();
  var Q = require('q');
  var route, get_path, post_path, put_path, get, create, update;

  beforeEach(function() {
    prepare_backend();
  });

  describe('GET', function() {
    it('should define the /books path for app.get', function() {
      expect(get_path).toBe('/books');
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
          expect(response.action).toBe('');
          done();
        });

        get(request, app_mock.response);
      });

    });
  });

  describe('POST', function() {
    it('should define the /books path for app.post', function() {
      expect(post_path).toBe('/books');
    });

    it('should call on model create', function(done) {
      spyOn(app_mock.response, 'json').andCallFake(function(response) {
        expect(response.data).toBe('post');
        expect(response.action).toBe('created');
        done();
      });

      create({}, app_mock.response);
    });
  });

  describe('PUT', function() {
    it('should define the /books path for app.put', function() {
      expect(put_path).toBe('/books');
    });

    it('should call on model update', function(done) {
      spyOn(app_mock.response, 'json').andCallFake(function(response) {
        expect(response.data).toBe('put');
        expect(response.action).toBe('updated');
        done();
      });

      update({}, app_mock.response);
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
      },
      create: function() {
        return create_promise('post');
      },
      update: function() {
        return create_promise('put');
      },
    };

    spyOn(app_mock.app, 'get');
    spyOn(app_mock.app, 'post');
    spyOn(app_mock.app, 'put');
    route = require('../books_routes.js')(app_mock.app, books_model);

    get_path = app_mock.app.get.mostRecentCall.args[0];
    get = app_mock.app.get.mostRecentCall.args[1];
    post_path = app_mock.app.post.mostRecentCall.args[0];
    create = app_mock.app.post.mostRecentCall.args[1];
    put_path = app_mock.app.put.mostRecentCall.args[0];
    update = app_mock.app.put.mostRecentCall.args[1];
  }

  function create_promise(resolve) {
    var deferred = Q.defer();
    deferred.resolve(resolve);
    return deferred.promise;
  }

});
