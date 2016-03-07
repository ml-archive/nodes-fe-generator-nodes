'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:ui-directive', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesDirectiveComponent = helpers.run(require.resolve('../generators/directive-component'))
					.withGenerators([
						require.resolve('../generators/module'),
						require.resolve('../generators/directive'),
						require.resolve('../generators/html'),
						require.resolve('../generators/scss')
					])
					.withOptions({

					})
					.withPrompts({
						html: true,
						scss: true,
						type: 'common',
						location: 'component',
						moduleName: 'uiDirective'
					})
					.withArguments(['ui-directive']);

				this.nodesDirectiveComponent.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates default component items', function(done) {

		this.nodesDirectiveComponent.on('end', function() {

			assert.file([
				'app/common/component/app-component.module.js',
				'app/common/component/app-component.directive.js',
				'app/common/component/app-component.template.html',
				'app/common/component/_app-component.scss'
			]);

			done();

		});

	});

});
