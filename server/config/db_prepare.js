'use strict';

module.exports = function(mysql) {
  return mysql.query('CREATE DATABASE IF NOT EXISTS editorial')
  .then(function() {
    return mysql.query('USE editorial');
  })
  .then(function() {
    return require('./db_create_tables.js')(mysql);
  })
  .then(function() {
    return mysql.query('INSERT INTO `tb_book` (`id`, `title`) ' +
                       'SELECT * FROM (SELECT 1, \'Libro1\') AS tmp ' +
                       'WHERE NOT EXISTS ( ' +
                       '  SELECT id FROM `tb_book` WHERE id = 1 ' +
                       ') LIMIT 1;');
  })
  .then(function() {
    return mysql.query('DELETE FROM `tb_table_contents` WHERE id_book = 1');
  })
  .then(function() {
    return mysql.query('INSERT INTO `tb_table_contents` (`id`, `content`, `level`, `order`, `id_book`) VALUES ' +
                       ' (1, \'Introduccion\', 1, 1, 1), ' +
                       ' (2, \'Motivacion\', 2, 2, 1), ' +
                       ' (3, \'Reseña Historica\', 2, 3, 1), ' +
                       ' (4, \'Origen\', 3, 4, 1), ' +
                       ' (5, \'Trabajos\', 3, 5, 1), ' +
                       ' (6, \'Soluciones Actuales\', 2, 6, 1), ' +
                       ' (7, \'Objetivos\', 2, 7, 1), ' +
                       ' (8, \'Requisitos\', 1, 8, 1), ' +
                       ' (9, \'Hardware\', 2, 9, 1), ' +
                       ' (10, \'Software\', 2, 10, 1);'
                       );
  })
  .catch(function(errors) {
    throw errors;
  });
};
