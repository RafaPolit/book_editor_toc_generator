'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var mysql = require('mysql-promise')();
var app = express();

require('./config/db_connection.js')(mysql);
var db_initialize = require('./config/db_initialize.js');

function load_data() {
  return require('./config/db_data.js')(mysql);
}

function prepare_app() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(path.join(__dirname, '/../client')));

  var books_model = require('./modules/books/books_model.js')(mysql);
  require('./modules/books/books_routes.js')(app, books_model);

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
}

db_initialize(mysql, 'editorial')
.then(load_data)
.then(prepare_app)
.catch(function(errors) {
  throw errors;
});
