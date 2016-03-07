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
			controller: <%= cameledName %>Controller
		});

	/* @ngInject */
	function <%= cameledName %>Controller() {
		/*jshint validthis: true */
		var vm = this;
	};

})();
