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
		.controller('<%= name %>Controller', <%= classedName %>Controller);

	/* @ngInject */
	function <%= classedName %>Controller() {
		/*jshint validthis: true */
		var vm = this;

		activate();

		function activate() {

		}
	}

})();
