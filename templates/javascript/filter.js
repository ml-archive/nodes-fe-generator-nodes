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
		.filter('<%= lowercase %>', <%= name %>);

	/* @ngInject */
	function <%= name %>() {
		return function(input) {
			return '<%= name %> filter: ' + input;
		};
	}
})();
