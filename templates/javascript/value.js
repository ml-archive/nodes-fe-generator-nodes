(function() {
	'use strict';

	angular.module('<%= moduleName %>')
		.value('<%= name %>', {
			meaningOfLife: 42
		});
})();