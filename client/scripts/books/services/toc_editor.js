'use strict';

angular.module('Books').factory('toc_editor', function(_, generate_toc_index) {

  return function($scope) {

    var toc = $scope.book.toc;

    toc.push(return_next_brother(toc.length-1));

    $scope.add_entry = function() {
      var new_entry = _(toc).findWhere({ new_entry: true });
      var new_entry_position = _(toc).indexOf(new_entry);

      toc.splice(new_entry_position, 0, _(new_entry).omit('new_entry'));
      toc[new_entry_position + 1] = return_next_brother(new_entry_position);

      $scope.sanitize_toc();
    };

    $scope.sanitize_toc = function() {
      _(toc).chain()
      .reject(function(item) { return item.new_entry; })
      .map(function(item, index, list) { return assess_correct_level(item, index, list); })
      .tap(function(toc) { generate_toc_index(toc); });
    };

    function return_next_brother(toc_position) {
      var brother = (toc[toc_position]) ? JSON.parse(JSON.stringify((toc[toc_position]))) : { level: 1, index: [ 0 ] };

      brother.index[brother.index.length - 1] += 1;
      brother.content = '';
      brother.new_entry = true;

      return brother;
    }

    function assess_correct_level(item, index, list) {
      if(index !== 0) {
        item.level = Math.min(list[index - 1].level + 1, item.level);
      }
      return item;
    }
  };

});