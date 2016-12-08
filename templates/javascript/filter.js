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
		.filter('<%= lowercase %>', <%= name %>Filter);

	/* @ngInject */
	function <%= name %>Filter() {
		return function(input) {
			return '<%= name %> filter: ' + input;
		};
	}
})();
