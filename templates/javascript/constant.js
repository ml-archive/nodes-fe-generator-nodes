(function() {
	'use strict';

	angular.module('<%= moduleName %>')
		.constant('<%= name %>', {
			meaningOfLife: 42
		});
})();