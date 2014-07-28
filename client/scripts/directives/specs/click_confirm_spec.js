'use strict';

describe('Directive: clickConfirm', function() {
  
  beforeEach(module('Directives'));
  
  var element;
  var scope;

  var compile_directive = function() {
    inject(function($rootScope, $compile){
      element = $('<div click-confirm="action()" confirm-text="Confirm Text"></div>');
      scope = $rootScope.$new();
      scope.action = function() {};
      $compile(element)(scope);
    });
  };

  describe('On instance', function() {
    
    beforeEach(function() {
      window.ace = { click_event: 'click' };
      window.bootbox = jasmine.createSpyObj('bootbox', [ 'dialog' ]);
      compile_directive();
    });
    
    it('should create a bootbox confirm modal with passed text', function(){
      element.trigger(window.ace.click_event);

      var args = window.bootbox.dialog.mostRecentCall.args[0];
      expect(args.message).toBe('Confirm Text');
    });

    it('should call the passed action on confirm', function() {
      element.trigger(window.ace.click_event);
      spyOn(scope, 'action');

      var action = window.bootbox.dialog.mostRecentCall.args[0].buttons.confirm.callback;
      action();

      expect(scope.action).toHaveBeenCalled();
    });
  });
});