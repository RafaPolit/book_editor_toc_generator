'use strict';

describe('Books model', function() {

  var mysql = require('mysql-promise')('testing-db');
  var model = require('../books_model.js')(mysql);

  beforeEach(function(done) {
    prepare_fixtures().then(function() { done(); });
  });

  describe('get', function() {
    it('should get all tb_book records', function(done) {
      model.get()
      .then(function(books) {
        expect(books.length).toBe(2);
        expect(books[0].title).toBe('Libro1');
        done();
      });
    });
  });

  describe('get_one', function() {

    var book;

    beforeEach(function(done) {
      model.get_one(2).then(function(_book_) {
        book = _book_;
        done();
      });
    });

    it('should get a single book in the db with TOC', function() {
      expect(book.title).toBe('Libro2');
      expect(book.toc.length).toBe(8);
      expect(book.toc[2].content).toBe('Reseña Historica');
    });

    it('should include the index numbers on the TOC (toc_index_generator utility)', function() {
      expect(book.toc[4].index).toEqual([ 1, 2, 2 ]);
    });
  });

  // ---

  function prepare_fixtures() {
    require('../../../config/db_connection.js')(mysql);
    return require('./fixtures/testing_fixtures.js')(mysql);
  }

});