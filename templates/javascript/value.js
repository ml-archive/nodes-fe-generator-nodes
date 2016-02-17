(function() {
	'use strict';

	/**
	 * @name
	 * @author
	 * @description
	 *
	 */
	angular.module('<%= moduleName %>')
		.value('<%= name %>', {
			meaningOfLife: 42
		});
})();