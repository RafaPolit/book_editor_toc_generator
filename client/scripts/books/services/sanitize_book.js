'use strict';

angular.module('Books').factory('sanitize_book', function(_) {

  return function(book) {
    var sanitized_toc = sanitize_toc();
    var sanitized_book = { title: book.title || '', toc: sanitized_toc };

    if(book.id) { sanitized_book.id = book.id; }

    return sanitized_book;

    function sanitize_toc() {
      return _(book.toc).chain()
      .reject(function(item) { return item.new_entry; })
      .map(default_values)
      .value();
    }

    function default_values(item, index) {
      return { order: index + 1, level: item.level || 1, content: item.content || '' };
    }
  };
  
});
