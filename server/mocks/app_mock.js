'use strict';

module.exports = function(){
  return {
    app: {
      get: function(){},
      post: function(){},
      put: function(){},
      delete: function(){},
    },

    response: {
      json: function(){},
      setHeader: function() {}
    }
  };
};
