/* globals bootbox */
'use strict';

angular.module('Directives').directive('clickConfirm', function($parse){

  return function(scope, element, attrs) {
    $(element).on('click', function() {
      bootbox.dialog(dialog_options(scope, attrs));
    });
  };

  function dialog_options(scope, attrs) {
    return {
      title: 'Atención!',
      message: attrs.confirmText,
      buttons: {
        cancel : { label : 'Cancelar', className : 'btn-sm' },
        confirm : {
          label : '<i class="icon-ok"></i> Confirmar',
          className : 'btn-sm btn-primary',
          callback : function() {
            scope.$apply(function() { $parse(attrs.clickConfirm)(scope); });
          }
        }
      }
    };
  }
});
