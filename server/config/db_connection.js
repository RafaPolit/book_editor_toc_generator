'use strict';

module.exports = function(mysql, database) {

  database = database || 'editorial';

  mysql.configure({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : database
  });

};