(function() {
	'use strict';

	/**
	 * @name
	 * @author
	 * @description
	 *
	 */
	angular
		.module('<%= name %>')
		.config(function($provide) {
			$provide.decorator('<%= classedName %>', <%= classedName %>Decorator);
		});
	
	/* @ngInject */
	function <%= classedName %>Decorator($delegate) {
			
	}
})();
