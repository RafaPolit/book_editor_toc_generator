'use strict';

module.exports = function(mysql, database) {
  return mysql.query('CREATE DATABASE IF NOT EXISTS ' + database)
  .then(function() {
    return require('./db_connection.js')(mysql, database);
  })
  .then(function() {
    return mysql.query('CREATE TABLE IF NOT EXISTS `tb_book` ( ' +
                       '  `id` int(11) NOT NULL AUTO_INCREMENT, ' +
                       '  `title` varchar(250) NOT NULL, ' +
                       '  PRIMARY KEY (`id`) ' +
                       ') ENGINE=MyISAM  DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC AUTO_INCREMENT=2;'
                      );
  })
  .then(function() {
    return mysql.query('CREATE TABLE IF NOT EXISTS `tb_table_contents` ( ' +
                       ' `id` int(11) NOT NULL AUTO_INCREMENT, ' +
                       ' `content` varchar(250) NOT NULL, ' +
                       ' `level` int(11) NOT NULL, ' +
                       ' `order` int(11) NOT NULL, ' +
                       ' `id_book` int(11) NOT NULL, ' +
                       ' PRIMARY KEY (`id`) ' +
                       ') ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11;'
                      );
  })
  .catch(function(errors) {
    throw errors;
  });
};
