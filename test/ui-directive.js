'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:ui-component', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesDirectiveComponent = helpers.run(require.resolve('../generators/ui-directive'))
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
						location: 'ui-directive',
						moduleName: 'uiDirective'
					})
					.withArguments(['ui-directive']);

				this.nodesDirectiveComponent.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates default directive items', function(done) {

		this.nodesDirectiveComponent.on('end', function() {

			assert.file([
				'app/common/ui-directive/ui-directive.module.js',
				'app/common/ui-directive/ui-directive.directive.js',
				'app/common/ui-directive/ui-directive.template.html',
				'app/common/ui-directive/_ui-directive.scss'
			]);

			done();

		});

	});

});
