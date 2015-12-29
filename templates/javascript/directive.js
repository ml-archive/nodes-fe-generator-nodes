(function() {
	'use strict';

	angular
		.module('<%= moduleName %>')
	  	.directive('<%= cameledName %>', <%= classedName %>);

	/* @ngInject */
	function <%= classedName %>() {
		var directive = {
            <% if (html) { %>
			templateUrl: '<%= filePath %>/<%= name.toLowerCase() %>.template.html',
            <% } %>
			link: link,
			restrict: 'EA'
		};

		return directive;

		function link(scope, element, attrs){
			element.text('this is the <%= cameledName %> directive');
		}
	}
})();
