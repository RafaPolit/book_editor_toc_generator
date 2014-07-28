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

  describe('create', function() {

    var body;

    beforeEach(function() {
      body = {
        title: 'new_book',
        toc: [ ]
      };
    });

    it('should create the sent data', function(done) {
      body.toc = [ { order: 1, level: 1, content: 'Content 1' }, { order: 2, level: 1, content: 'Content 2' } ];
      model.create(body)
      .then(function(book) {
        expect(book.title).toBe('new_book');
        expect(book.toc.length).toBe(2);
        expect(book.toc[1].content).toBe('Content 2');
        done();
      });
    });

    describe('When TOC is empty', function() {
      it('should not attempt to create TOC contents', function(done) {
        model.create(body)
        .then(function(book) {
          expect(book.title).toBe('new_book');
          done();
        })
        .catch(done);
      });
    });

  });

  describe('update', function() {

    var body;

    beforeEach(function() {
      body = {
        id: 1,
        title: 'updated book',
        toc: [ ]
      };
    });

    it('should update the sent data', function(done) {
      body.toc = [ { order: 1, level: 1, content: 'Content 1' }, { order: 2, level: 1, content: 'Content 2' } ];
      model.update(body)
      .then(function(book) {
        expect(book.title).toBe('updated book');
        expect(book.toc.length).toBe(2);
        expect(book.toc[1].content).toBe('Content 2');
        done();
      });
    });

    describe('When TOC is empty', function() {
      it('should not attempt to create TOC contents', function(done) {
        model.update(body)
        .then(function(book) {
          expect(book.title).toBe('updated book');
          done();
        })
        .catch(done);
      });
    });

  });

  describe('remove', function() {

    var book;

    beforeEach(function(done) {
      model.remove(1)
      .then(function() {
        return model.get_one(1);
      })
      .then(function(_book_) {
        book = _book_;
        done();
      })
      .catch(done);
    });

    it('should have removed the book from the DB', function() {
      expect(book).toEqual({});
    });

  });

  // ---

  function prepare_fixtures() {
    require('../../../config/db_connection.js')(mysql);
    return require('./fixtures/testing_fixtures.js')(mysql);
  }

});