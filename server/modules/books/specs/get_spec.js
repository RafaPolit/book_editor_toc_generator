'use strict';

describe('Books Get', function() {

  var mysql = require('mysql-promise')('testing-db');
  var app_mock = require('../../../mocks/app_mock.js')();
  var route, path, get;

  beforeEach(function(done) {
    prepare_backend()
    .then(function() {
      path = app_mock.app.get.mostRecentCall.args[0];
      get = app_mock.app.get.mostRecentCall.args[1];
      done();
    });
  });

  it('should define the /books path for app.get', function() {
    expect(path).toBe('/books');
  });

  describe('When no arguments passed on request', function() {

    it('should fetch all the books in the db', function(done) {
      spyOn(app_mock.response, 'json').andCallFake(function(response) {
        expect(response.data.length).toBe(2);
        expect(response.data[0].title).toBe('Libro1');
        expect(response.data[0].toc).toBeUndefined();
        expect(response.data[1].title).toBe('Libro2');
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

    it('should fetch a single book in the db with TOC', function(done) {
      spyOn(app_mock.response, 'json').andCallFake(function(response) {
        expect(response.data[0].title).toBe('Libro2');
        expect(response.data[0].toc.length).toBe(8);
        expect(response.data[0].toc[2].content).toBe('Reseña Historica');
        done();
      });

      get(request, app_mock.response);
    });

    it('should include the index numbers on the TOC', function(done) {
      spyOn(app_mock.response, 'json').andCallFake(function(response) {
        expect(response.data[0].toc[0].index).toEqual([ 1 ]);
        expect(response.data[0].toc[1].index).toEqual([ 1, 1 ]);
        expect(response.data[0].toc[2].index).toEqual([ 1, 2 ]);
        expect(response.data[0].toc[3].index).toEqual([ 1, 2, 1 ]);
        expect(response.data[0].toc[4].index).toEqual([ 1, 2, 2 ]);
        expect(response.data[0].toc[5].index).toEqual([ 2 ]);
        expect(response.data[0].toc[6].index).toEqual([ 2, 1 ]);
        expect(response.data[0].toc[7].index).toEqual([ 2, 2 ]);
        done();
      });

      get(request, app_mock.response);
    });

  });

  // ---

  function prepare_backend() {

    require('../../../config/db_connection.js')(mysql);

    return require('./fixtures/testing_fixtures.js')(mysql)
    .then(function() {
      spyOn(app_mock.app, 'get');
      route = require('../get.js')(app_mock.app, mysql);
    });

  }

});
