'use strict';

module.exports = function(app, model) {

  app.get('/books', function(req, res) {

    if (req.query && req.query.id) {
      respond(res, model.get_one, req.query.id);
      return;
    }

    respond(res, model.get);
  });

  // --------------------

  function respond(res, operation, options) {
    operation(options)
    .then(function(response) {
      res.json({ data: response });
    });
  }

};