'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

var getDefaultFilesForAppPath = function(appPath) {

	return [
		appPath + '/404.html',
		appPath + '/503.html',
		appPath + '/favicon.ico',
		appPath + '/robots.txt',
		appPath + '/assets/images/logo.png',
		appPath + '/common/core/loadingindicator/_loadingindicator.scss',
		appPath + '/common/core/loadingindicator/loadingindicator.template.html',
		appPath + '/config/api_endpoints.constant.js',
		appPath + '/config/application_settings.constant.js',
		appPath + '/config/config.js',
		appPath + '/config/environment.js',
		appPath + '/modules/_application/_application.scss',
		appPath + '/modules/_application/application.controller.js',
		appPath + '/modules/_application/application.module.js',
		appPath + '/modules/_application/application.route.js',
		appPath + '/modules/_application/application.template.html',
		appPath + '/modules/index/_index.scss',
		appPath + '/modules/index/index.controller.js',
		appPath + '/modules/index/index.module.js',
		appPath + '/modules/index/index.route.js',
		appPath + '/modules/index/index.template.html',
		appPath + '/styles/elements/_loading-bar.scss',
		appPath + '/styles/_fonts.scss',
		appPath + '/styles/_normalize.scss',
		appPath + '/styles/_variables.scss',
		'.htaccess',
		'.bowerrc',
		'.npmrc',
		'.jshintrc',
		'.jscsrc',
		'.gitignore',
		'.editorconfig',
		'.gitattributes',
		'bower.json',
		'package.json',
		'Gruntfile.js'
	];

};

describe('nodes:app', function() {

	var appPath = 'customAppPath';
	var appName = 'custom_App Name';

	beforeEach(function() {

		this.nodes = helpers
			.run(require.resolve('../generators/app'))
			.withOptions({
				'skip-install': true
			})
			.withPrompts({
				appName: appName,
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
	});

	describe('default settings', function() {
		beforeEach(function(done) {
			this.nodes.on('end', done);
		});

		it('generates the bass files', function() {
			assert.file(getDefaultFilesForAppPath('app'));
		});
	});

	describe('ng-app', function() {
		beforeEach(function(done) {
			this.nodes.on('end', done);
		});

		it('slugify the ng-app name', function() {
			assert.fileContent(
				'app/index.html',
				/ng-app="custom-app-name"/
			);
		});
	});

});