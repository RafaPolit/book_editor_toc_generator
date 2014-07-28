'use strict';

module.exports = function(app, model) {

  app.get('/books', function(req, res) {

    if (req.query && req.query.id) {
      respond(res, model.get_one, req.query.id);
      return;
    }

    respond(res, model.get);
  });

  app.post('/books', function(req, res) {
    respond(res, model.create, req.body, 'created');
  });

  // --------------------

  function respond(res, operation, options, action) {
    operation(options)
    .then(function(response) {
      res.json({ data: response, action: action || '' });
    });
  }

};