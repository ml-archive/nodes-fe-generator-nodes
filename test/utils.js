'use strict';
var helpers = require('yeoman-test');

exports.generateFullProject = function(cb) {
	return helpers.run(require.resolve('../generators/app'))
		.withOptions({
			'skip-install': true
		})
		.withPrompts({
			appName: 'app',
			jsLibraries: [
				{ncore: false},
				{foundation: false},
				{greensock: false},
				{lodash: false}
			],
			ngModules: [
				{ngAnimate: false},
				{ngSanitize: false},
				{ngTouch: false}
			],
			ngAdditionalModules: [
				{ngstorage: false}
			]
		});
};
