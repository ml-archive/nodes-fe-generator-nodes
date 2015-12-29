(function () {
	'use strict';

	angular
		.module('<%= moduleName %>')
		.controller('<%= name %>Controller', <%= classedName %>);

	/* @ngInject */
	function <%= classedName %>() {
		/*jshint validthis: true */
		var vm = this;

		activate();

		function activate() {

		}
	}

})();
