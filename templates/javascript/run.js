(function() {
	'use strict';

	/**
	 * @name <%= appname %>
	 * @description
	 *
	 * Run phase of the Application.
	 */
	angular
		.module('<%= appname %>')
		.run(run);

	function run($state, $rootScope) {

	}
})();
