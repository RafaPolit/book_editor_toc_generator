'use strict';

describe('Sanitize book service', function() {

  beforeEach(module('Books'));

  var book;
  var service;
  var sanitized_book;

  beforeEach(inject(function (sanitize_book) {
    book = prepare_incomplete_book();

    service = sanitize_book;
    sanitized_book = service(book);
  }));

  it('return an ID if original book has one', function() {
    expect(sanitized_book.id).toBeUndefined();

    book.id = 'id';
    expect(service(book).id).toBe('id');
  });

  it('return a Title, no matter what', function() {
    expect(sanitized_book.title).toBe('');

    book.title = 'With title';
    expect(service(book).title).toBe('With title');
  });

  it('should add orders to the TOC entries', function() {
    expect(sanitized_book.toc[0].order).toBe(1);
    expect(sanitized_book.toc[1].order).toBe(2);
    expect(sanitized_book.toc[4]).toBeUndefined();
  });

  it('should keep the level adding empty content if missing', function() {
    expect(sanitized_book.toc[0].level).toBe(1);
    expect(sanitized_book.toc[1].level).toBe(2);
    expect(sanitized_book.toc[2].level).toBe(1);
  });

  it('should keep the content adding empty content if missing', function() {
    expect(sanitized_book.toc[0].content).toBe('Content');
    expect(sanitized_book.toc[1].content).toBe('');
  });

  // ------------------------------

  function prepare_incomplete_book() {
    return {
      toc: [
        { level: 1, content: 'Content' },
        { new_entry: true },
        { level: 2, should_not_send: true },
        { should_not_send: true }
      ]
    };
  }

});
