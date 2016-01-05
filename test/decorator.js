'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:decorator', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesDecorator = helpers.run(require.resolve('../generators/decorator'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'config',
						location: 'decorator'
					})
					.withArguments(['decorator']);

				this.nodesDecorator.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default decorator files', function(done) {

		this.nodesDecorator.on('end', function() {

			assert.file([
				'app/config/decorator/decorator.module.js',
				'app/config/decorator/decorator.decorator.js'
			]);

			done();

		});

	});

	it('generates the decorator module', function(done) {

		this.nodesDecorator.on('end', function() {

			assert.fileContent(
					'app/config/decorator/decorator.module.js',
					/module\('decorator'/
			);

			done();

		});

	});

	it('capitalizes the decorator name', function(done) {

		this.nodesDecorator.on('end', function() {

			assert.fileContent(
					'app/config/decorator/decorator.decorator.js',
					/\$provide.decorator\('Decorator'/
			);

			done();

		});

	});

});
