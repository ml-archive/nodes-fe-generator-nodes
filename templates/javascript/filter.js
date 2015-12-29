(function() {
	'use strict';

	angular
		.module('<%= moduleName %>')
		.filter('<%= lowercase %>', <%= name %>);

	/* @ngInject */
	function <%= name %>() {
		return function (input) {
			return '<%= name %> filter: ' + input;
		};
	}
})();
