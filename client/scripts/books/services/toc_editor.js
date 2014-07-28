'use strict';

angular.module('Books').factory('toc_editor', function(_, generate_toc_index, drag_and_drop) {

  return function($scope) {

    var book = $scope.book;
    book.toc.push({ new_entry: true });
    drag_and_drop($scope);

    $scope.assign_new_entry_data = function assign_new_entry_data() {
      _(book.toc).each(function(item, index) {
        if(item.new_entry) {
          _(item).extend(return_next_brother(index - 1));
        }
      });
    };
    
    $scope.assign_new_entry_data();

    $scope.add_entry = function() {
      var new_entry = _(book.toc).findWhere({ new_entry: true });
      var new_entry_position = _(book.toc).indexOf(new_entry);

      book.toc.splice(new_entry_position, 0, _(new_entry).omit('new_entry'));

      $scope.sanitize_toc();
      $scope.assign_new_entry_data();
    };

    $scope.edit_entry_start = function(toc_entry) {
      _(book.toc).each(function(item) {
        item.editing = false;
      });

      toc_entry.editing = true;
      $scope.initial_status = { level: toc_entry.level, content: toc_entry.content };
    };

    $scope.edit_entry = function(toc_entry) {
      toc_entry.editing = false;
      $scope.sanitize_toc();
      $scope.assign_new_entry_data();
    };

    $scope.edit_entry_cancel = function(toc_entry) {
      toc_entry.editing = false;
      toc_entry.level = $scope.initial_status.level;
      toc_entry.content = $scope.initial_status.content;
      delete $scope.initial_status;

      $scope.sanitize_toc();
      $scope.assign_new_entry_data();
    };

    $scope.remove_entry = function(entry_to_be_removed) {
      book.toc = _(book.toc).reject(function(item) {
        return item === entry_to_be_removed;
      });

      $scope.sanitize_toc();
      $scope.assign_new_entry_data();
    };

    $scope.indent = function(params) {
      var previous_item = book.toc[params.index - 1];
      if (previous_item && params.index) {
        params.item.level = Math.min(params.item.level + 1, previous_item.level + 1);
        params.item.index = _(previous_item.index).first(params.item.level);

        if(params.item.level > previous_item.level) {
          transform_matrix(params.item.index, [ 'push' ]);
        }

        transform_matrix(params.item.index, [ 1 ]);
      }
    };

    $scope.dedent = function(item) {
      if(item.level > 1) {
        item.level -= 1;
        transform_matrix(item.index, [ 1, 'remove' ]);
      }
    };

    $scope.sanitize_toc = function() {
      _(book.toc).chain()
      .reject(function(item) { return item.new_entry; })
      .map(function(item, index, list) {
        if(!index) { item.level = 1; }
        return assess_correct_level(item, index, list);
      })
      .tap(function(toc) { generate_toc_index(toc); });
    };

    function return_next_brother(toc_position) {
      var previous_item = (book.toc[toc_position]) ? book.toc[toc_position] : { level: 1, index: [ 0 ] };
      var brother = JSON.parse(JSON.stringify(previous_item));

      transform_matrix(brother.index, [ 1 ]);
      return _(brother).extend({ content: '', new_entry: true });
    }

    function assess_correct_level(item, index, list) {
      if(index !== 0) {
        item.level = Math.min(list[index - 1].level + 1, item.level);
      }
      return item;
    }

    function transform_matrix(original_matrix, transformation_matrix) {
      if(_(transformation_matrix).indexOf('remove') > -1) {
        original_matrix.pop();
      }

      _(transformation_matrix).chain()
      .without('push', 'remove')
      .each(function(transfromation, index) {
        original_matrix[original_matrix.length - 1 - index] += transfromation; 
      });

      if(_(transformation_matrix).indexOf('push') > -1) {
        original_matrix.push(0);
      }
    }

  };

});