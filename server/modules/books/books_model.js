'use strict';

var toc_index_generator = require('../utilities/toc_index_generator.js');
var _ = require('underscore');

module.exports = function(mysql) {

  var get = function() {
    return mysql.query('SELECT * FROM tb_book')
    .spread(function(books) {
      return books;
    });
  };

  var get_one = function(id) {
    return mysql.query('SELECT * FROM tb_book WHERE id = ?', [ id ])
    .spread(function(books) {
      if(books.length) { return populate_toc(books); }
      return {};
    })
    .then(function(book) {
      return book;
    });
  };

  var create = function(data) {
    var new_book_id;

    return mysql.query('INSERT INTO tb_book (`title`) VALUES (?)', [ data.title ])
    .spread(function(results) {
      new_book_id = results.insertId;
      insert_toc(data, new_book_id);
    })
    .spread(function() { return get_one(new_book_id); });
  };

  var update = function(data) {
    return mysql.query('UPDATE tb_book SET `title` = ? WHERE id = ?', [ data.title, data.id ])
    .spread(function() {
      return mysql.query('DELETE FROM  tb_table_contents WHERE id_book = ?', [ data.id ]);
    })
    .spread(function() { insert_toc(data, data.id); })
    .spread(function() { return get_one(data.id); });
  };

  var remove = function(id) {
    return mysql.query('DELETE FROM tb_book WHERE id = ?', [ id ])
    .spread(function() {
      return mysql.query('DELETE FROM tb_table_contents WHERE id_book = ?', [ id ]);
    });
  };


  return {
    get: get,
    get_one: get_one,
    create: create,
    update: update,
    remove: remove
  };

  // ---

  function populate_toc(books) {
    var select = 'SELECT * FROM tb_table_contents WHERE id_book = ?';
    return mysql.query(select, [books[0].id])
    .spread(function(toc) {
      return _(books[0]).extend({ toc: toc_index_generator(toc) });
    });
  }

  function insert_toc(data, new_book_id) {
    if(data.toc.length) {
      return insert_tb_table_contents(data, new_book_id);
    }
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