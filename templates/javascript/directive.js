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
	  	.directive('<%= cameledName %>', <%= classedName %>Directive);

	/* @ngInject */
	function <%= classedName %>Directive() {
		var directive = {<% if (html) { %>
			templateUrl: '<%= filePath %>/<%= name.toLowerCase() %>.template.html',<% } %>
			link: link,
			restrict: 'A'
		};

		return directive;

		function link(scope, element, attrs) {
			element.text('this is the <%= cameledName %> directive');
		}
	}
})();
