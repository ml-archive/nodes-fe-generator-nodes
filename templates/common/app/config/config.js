(function() {
	'use strict';

	/**
	 * @name config
	 * @description
	 *
	 * Glboal Configuration Module
	 */
	var core = angular.module('config', [
		'ENVIRONMENT',
		'APPLICATION_SETTINGS',
		'angular-loading-bar',
		'cgBusy'
	]);

	core.value('cgBusyDefaults', {
		message: 'Loading Stuff',
		backdrop: true,
		templateUrl: '../common/core/loadingindicator/loadingindicator.template.html'
	});

	core.config(configure);

	/* @ngInject */
	function configure(ENVIRONMENT,
					   $logProvider,
					   $stateProvider,
					   $urlRouterProvider,
					   $locationProvider,
					   cfpLoadingBarProvider,
					   $httpProvider) {

		if($logProvider.debugEnabled && ENVIRONMENT !== 'PRODUCTION') {
			$logProvider.debugEnabled(true);
		} else {
			$logProvider.debugEnabled(false);
		}

		cfpLoadingBarProvider.includeSpinner = false;
		cfpLoadingBarProvider.latencyThreshold = 100;

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/404');

		$stateProvider
			.state('application.notfound', {
				url: '/404',
				views: {
					'application@': {
						templateUrl: '404.html'
					}
				}
			})
			.state('error', {
				url: '/503',
				views: {
					'application@': {
						templateUrl: '503.html'
					}
				}
			});
	}

})();
