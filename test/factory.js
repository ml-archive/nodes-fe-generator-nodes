'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:factory', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesFactory = helpers.run(require.resolve('../generators/factory'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'models',
						location: 'factory'
					})
					.withArguments(['factory']);

				this.nodesFactory.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default factory files', function(done) {

		this.nodesFactory.on('end', function() {

			assert.file([
				'app/models/factory/factory.module.js',
				'app/models/factory/factory.factory.js'
			]);

			done();

		});

	});

	it('generates the factory module', function(done) {

		this.nodesFactory.on('end', function() {

			assert.fileContent(
					'app/models/factory/factory.module.js',
					/module\('factory'/
			);

			done();

		});

	});

	it('capitalizes and appends Factory to the factory name', function(done) {

		this.nodesFactory.on('end', function() {

			assert.fileContent(
					'app/models/factory/factory.factory.js',
					/\.factory\('FactoryFactory'/
			);

			done();

		});

	});

});
