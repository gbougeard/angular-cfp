'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
directive('popover', function(){
        var title = '',
            id = '',
            content = '';

        return {
            restrict: 'E',
//            transclude: true,
            scope: {
                id: '@id',
                title: '@title',
                content: "@content"
            },
            replace: true,
            template: '<div></div>',
            link: function (scope, element, attrs) {

                scope.$watch(attrs.popover, function (value) {
                    var el = '#'+id;
                    var options = {};
                    options.title = title;
                    options.content= content;
                    options.html = true;
                    $(el).popover(options);
                });
            }
        }
    });
