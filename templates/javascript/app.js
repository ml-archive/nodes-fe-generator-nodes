(function() {
	'use strict';

	/**
	 * @name <%= appname %>
	 * @description
	 *
	 * Root Application Module
	 */
	angular
		.module('<%= appname %>', [
			<%- ngModules %>,
			/* ---> Do not delete this comment (ngImports) <--- */
	]);
})();