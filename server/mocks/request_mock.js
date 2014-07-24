'use strict';

var request;

var create_request_mock = function(method){

  method = method || 'GET';
  
  return {
    method: method,
    path: '',
    body: {},
    query: {}
  };
};

var request_mock = {
  new: function(method) {
    request = create_request_mock(method);
    return this;
  },
  get: function() {
    return request;
  }
};

module.exports = request_mock;
