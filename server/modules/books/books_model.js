'use strict';

var toc_index_generator = require('../utilities/toc_index_generator.js');
var _ = require('underscore');

module.exports = function(mysql) {

  return {

    get: function() {
      return mysql.query('SELECT * FROM tb_book')
      .spread(function(books) {
        return books;
      });
    },

    get_one: function(id) {
      return mysql.query('SELECT * FROM tb_book WHERE id = ?', [id])
      .spread(populate_toc)
      .then(function(book) {
        return book;
      });
    }

  };

  function populate_toc(books) {
    var select = 'SELECT * FROM tb_table_contents WHERE id_book = ?';
    return mysql.query(select, [books[0].id])
    .spread(function(toc) {
      return _(books[0]).extend({ toc: toc_index_generator(toc) });
    });
  }

};