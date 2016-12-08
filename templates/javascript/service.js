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
		.service('<%= name %>Service', <%= classedName %>Service);

	/* @ngInject */
	function <%= classedName %>Service(<% if (injectCommonModules) { %><%= '$exceptionHandler, $q, $http, API_ENDPOINTS' %><% } %>) {
		/*jshint validthis: true */
		
		// Variables

		return {
			// publicMethod: publicMethod
		};

		// function publicMethod() ...
	}

})();
