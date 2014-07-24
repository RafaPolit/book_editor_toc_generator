'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

var mysql = require('mysql-promise')();

require('./config/db_connection.js')(mysql);

var app = express();

var db_prepare = require('./config/db_prepare.js');

db_prepare(mysql)
.then(function() {

  app.set('port', process.env.PORT || 3000);
  app.use(express.static(path.join(__dirname, '/../client')));

  require('./modules/books/get.js')(app, mysql);

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

})
.catch(function(errors) {
  throw errors;
});
