'use strict';

var _ = require('underscore');

module.exports = function(app, mysql) {

  app.get('/books', function(req, res) {
    
    var db_get = (req.query && req.query.id) ? get_one : get_all;

    db_get(req)
    .then(function(books) {
      res.json({ data: books });
    });

  });

  // --------------------

  function get_all() {
    return mysql.query('SELECT * FROM tb_book')
    .spread(function(books) {
      return books;
    });
  }

  function get_one(req) {
    return mysql.query('SELECT * FROM tb_book WHERE id = ?', [req.query.id])
    .spread(populate_toc)
    .then(function(book) {
      index_toc(book.toc);
      return [ book ];
    });
  }

  function populate_toc(books) {
    var select = 'SELECT * FROM tb_table_contents WHERE id_book = ? ORDER BY `order` ASC';

    return mysql.query(select, [books[0].id])
    .spread(function(toc) {
      return _(books[0]).extend({ toc: toc });
    });
  }

  function index_toc(toc) {
    var previous = { index: [0], level: 1 };

    _(toc).each(function(element) {
      assign_current_toc_index(previous, element);
      previous = { index: _(element.index).clone(), level: element.level };
    });
  }

  function assign_current_toc_index(previous, element) {
    element.index = _(previous.index).initial(previous.level - element.level);
    if(element.level === (previous.level + 1)) { element.index.push(0); }
    element.index[element.index.length - 1] += 1;
  }

};