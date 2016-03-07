'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:component', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesComponent = helpers.run(require.resolve('../generators/component'))
					.withGenerators([
						require.resolve('../generators/module'),
						require.resolve('../generators/html'),
						require.resolve('../generators/scss')
					])
					.withPrompts({
						html: false,
						scss: false,
						type: 'common',
						location: 'component'
					})
					.withArguments(['my-component']);

				this.nodesComponent.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default component files', function(done) {

		this.nodesComponent.on('end', function() {

			assert.file([
				'app/common/component/my-component.module.js',
				'app/common/component/my-component.component.js'
			]);

			done();

		});

	});

	it('generates the component module', function(done) {

		this.nodesComponent.on('end', function() {

			assert.fileContent(
					'app/common/component/my-component.module.js',
					/module\('myComponent'/
			);

			done();

		});

	});

	it('converts the component name to camelCase', function(done) {

		this.nodesComponent.on('end', function() {

			assert.fileContent(
					'app/common/component/my-component.component.js',
					/.component\('myComponent'/
			);

			done();

		});

	});

});
