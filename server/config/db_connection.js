'use strict';

module.exports = function(mysql, database) {

  var configuration = {
    host     : 'localhost',
    user     : 'root',
    password : '',
  };

  if(database) {
    configuration.database = database;
  }

  mysql.configure(configuration);

};