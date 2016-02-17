(function () {
	'use strict';

	/**
	 * @name application
	 * @description
	 *
	 * Root Application Controller
	 */
	angular
		.module('application')
		.controller('Application', Application);

	/* @ngInject */
	function Application() {
		/*jshint validthis: true */
		var vm = this;

		activate();

		function activate() {

		}
	}

})();
