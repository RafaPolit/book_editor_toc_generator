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
      return mysql.query('SELECT * FROM tb_book WHERE id = ?', [ id ])
      .spread(populate_toc)
      .then(function(book) {
        return book;
      });
    },

    create: function(data) {
      var new_book_id;
      var _this = this;

      return mysql.query('INSERT INTO tb_book (`title`) VALUES (?)', [ data.title ])
      .spread(function(results) {
        new_book_id = results.insertId;
        return insert_tb_table_contents(data, new_book_id);
      })
      .spread(function() {
        return _this.get_one(new_book_id);
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

  function insert_tb_table_contents(data, new_book_id) {
    var interrogations = create_values_interrogations(data.toc);
    var values = create_values_array(data.toc, new_book_id);

    return mysql.query('INSERT INTO tb_table_contents ' +
                       '(`content`, `level`, `order`, `id_book`) ' +
                       'VALUES' + interrogations, values);
  }

  function create_values_interrogations(toc) {
    return _(toc).map(function() {
      return '(?, ?, ?, ?)';
    }).join(', ');
  }

  function create_values_array(toc, book_id) {
    return _(toc).chain()
    .map(function(item) {
       return [ item.content, item.level, item.order, book_id ];
    }, [])
    .flatten()
    .value();
  }

};