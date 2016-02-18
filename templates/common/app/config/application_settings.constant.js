(function() {
	'use strict';

	/**
	 * @name APPLICATION_SETTINGS
	 * @description
	 *
	 * Common Application wide configuration settings ie. api keys or disabled features.
	 */
	angular
			.module('APPLICATION_SETTINGS', [])
			.constant('APPLICATION_SETTINGS', {
				nStack: {
					appId: '',
					apiKey: ''
				}
			});

})();