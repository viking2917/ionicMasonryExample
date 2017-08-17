// slightly modified version of Klederson's directive
// https://github.com/klederson/angular-masonry-directive
// made the signatures ok for minimization, protected against a few edge cases.

(function() {
    "use strict";

    angular.module('masonry', ['ng']).directive('masonry', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, elem, attrs) {
                var container = elem[0];
                var options = angular.extend({
                    itemSelector: '.item'
                }, angular.fromJson(attrs.masonry));

                var masonry = scope.masonry = new Masonry(container, options);
		
                var debounceTimeout = 0;
                scope.update = function() {
                    if (debounceTimeout) {
                        $timeout.cancel(debounceTimeout);
                    }
                    debounceTimeout = $timeout(function() {
                        debounceTimeout = 0;

                        masonry.reloadItems();
			/* mw add */
			var foo2 = $(options.stamp);
			if(foo2) masonry.stamp(foo2);

                        masonry.layout();
                        elem.children(options.itemSelector).css('visibility', 'visible');

			/* mw add */
                        if(foo2) elem.children(options.stamp).css('visibility', 'visible');

                    }, 200);
                };
                
                scope.removeBrick = function() {
                    $timeout(function() {
                        masonry.reloadItems();
                        masonry.layout();
                   }, 500);
                };                
                
                scope.appendBricks = function(ele) {
                    masonry.appended(ele);
                };                
                
                scope.$on('masonry.layout', function() {
                    masonry.layout();                 
                });
                
                scope.update();
            }
        };
    }]).directive('masonryTile', function() {
        return {
            restrict: 'AC',
            link: function(scope, elem) {
		if(typeof elem == "object") {
                elem.css('visibility', 'hidden');
		    var master = elem.parent('*[masonry]:first').scope(),
			update = master.update,
			removeBrick = master.removeBrick,
			appendBricks = master.appendBricks;                    
                if (update && elem) {
                    imagesLoaded( elem.parent(), update);
                    elem.ready(update);
                }
                if (appendBricks&& elem) {
                    imagesLoaded( elem[0], appendBricks(elem));
                }                
                scope.$on('$destroy', function() {
                    if (removeBrick) {
                        removeBrick();
                    }
                });
                }
            }
        };
    });
})();
