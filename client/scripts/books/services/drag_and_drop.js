'use strict';

angular.module('Books').factory('drag_and_drop', function() {

  return function($scope) {

    $scope.sortableOptions = {
      handle: '.drag-handle',
      update: function(event, ui) {
        $scope.drop_index = ui.item.sortable.dropindex;
      },
      stop: function() {
        $scope.assign_dragged_level();
        $scope.sanitize_toc();
        $scope.assign_new_entry_data();
      }
    };

    $scope.assign_dragged_level = function() {
      if($scope.drop_index === 0) { $scope.book.toc[0].level = 1; }
      if($scope.drop_index !== 0) { assign_if_other_level(); }
    };

    function assign_if_other_level() {
      var previous_item_level = $scope.book.toc[$scope.drop_index - 1].level;
      var next_item_level = $scope.book.toc[$scope.drop_index + 1].level;

      if(assess_if_next_level(previous_item_level, next_item_level)) {
        $scope.book.toc[$scope.drop_index].level = next_item_level;
        return;
      }

      $scope.book.toc[$scope.drop_index].level = previous_item_level;
    }

    function assess_if_next_level(previous_item_level, next_item_level) {
      var between_brothers = (previous_item_level === next_item_level);
      var between_father_and_son = (previous_item_level < next_item_level);

      return (between_brothers || between_father_and_son);
    }

  };

});