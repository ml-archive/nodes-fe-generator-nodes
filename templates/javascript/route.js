(function() {
	'use strict';

	/**
	 * @name
	 * @author
	 * @description
	 *
	 */
	angular.module('<%= moduleName %>')
		/* @ngInject */
		.config(function ($stateProvider) {

			var <%= name %> = {
				name: 'application.<%= lowercaseName %>',
				url: '/<%= lowercaseName %>',
				views: {
					'application@application': {
						templateUrl: 'modules/<%= lowercaseName %>/<%= lowercaseName %>.template.html',
						controller: '<%= name %>Controller',
						controllerAs: '<%= lowercaseName %>'
					}
				}
			};

			$stateProvider.state(<%= name %>);
		});
})();
