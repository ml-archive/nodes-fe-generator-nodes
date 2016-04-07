(function() {
	'use strict';

	/**
	 * @name
	 * @author
	 * @description
	 *
	 */
	angular
		.module('<%= moduleName %>')
		.animation('.<%= dashedName %>', <%= classedName %>);

	/* @ngInject */
	function <%= classedName %>() {
		/*jshint validthis: true */
		var animationDefinition = {
			//enter: enterFn,
			//leave: leaveFn,
			//move: moveFn,
			//addClass: addClassFn,
			//removeClass: removeClassFn,
			//animate: animateFn
		};

		return animationDefinition;

		/*
		function enterFn(element, done) {
			element.css('opacity',0);

			jQuery(element).animate({
				opacity: 1
			}, done);

			// optional onDone or onCancel callback
			// function to handle any post-animation
			// cleanup operations
		 	return function(isCancelled) {
		 		if(isCancelled) {
		 			jQuery(element).stop();
		 		}
		 	}
		}
		 */
	}

})();
