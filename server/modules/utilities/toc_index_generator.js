'use strict';

var _ = require('underscore');

module.exports = function(toc) {

  toc = _(JSON.parse(JSON.stringify(toc))).sortBy('order');

  var previous = { index: [0], level: 1 };

  return _(toc).each(function(element) {
    assign_current_toc_index(previous, element);
    previous = { index: _(element.index).clone(), level: element.level };
  });

};

function assign_current_toc_index(previous, element) {
  element.index = _(previous.index).initial(previous.level - element.level);
  if(element.level === (previous.level + 1)) { element.index.push(0); }
  element.index[element.index.length - 1] += 1;
}