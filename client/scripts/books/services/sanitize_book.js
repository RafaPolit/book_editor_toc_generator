'use strict';

angular.module('Books').factory('sanitize_book', function(_) {

  return function(book) {

    var sanitized_toc = sanitize_toc();
    return { title: book.title || '', toc: sanitized_toc };

    function sanitize_toc() {
      return _(book.toc).chain()
      .reject(function(item) { return item.new_entry; })
      .map(function(item, index) {
        return { order: index + 1, level: item.level || 1, content: item.content || '' };
      })
      .value();
    }

  };

});