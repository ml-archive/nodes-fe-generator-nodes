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
		.component('<%= cameledName %>', {
			bindings: {},<% if (html) { %>
			templateUrl: '<%= filePath %>/<%= name.toLowerCase() %>.template.html',<% } %>
			controller: <%= classedName %>Component
		});

	/* @ngInject */
	function <%= classedName %>Component() {
		/*jshint validthis: true */
		var vm = this;
	};

})();
