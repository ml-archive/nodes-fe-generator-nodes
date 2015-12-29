(function() {
	'use strict';

	angular
		.module('<%= name %>')
		.config(function ($provide) {
			$provide.decorator('<%= classedName %>', function ($delegate) {
				// decorate the $delegate
				return $delegate;
			});
		});
})();