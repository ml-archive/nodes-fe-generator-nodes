(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name <%= appname %>
	 * @description
	 * # <%= appname %>
	 *
	 * Main module of the application.
	 */
	angular
		.module('<%= appname %>', [
			<%- ngModules %>,
			/* ---> Do not delete this comment (ngImports) <--- */
	]);
})();