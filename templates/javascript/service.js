(function () {
	'use strict';

	angular
		.module('<%= moduleName %>')
		.service('<%= name %>Service', <%= classedName %>);

	/* @ngInject */
	function <%= classedName %>() {
		/*jshint validthis: true */

		// Variables

		return {
			// publicMethod: publicMethod
		};

		// function publicMethod() ...
	}

})();
