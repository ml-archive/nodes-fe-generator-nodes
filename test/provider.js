'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:provider', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesProvider = helpers.run(require.resolve('../generators/provider'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'common',
						location: 'provider'
					})
					.withArguments(['provider']);

				this.nodesProvider.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default provider files', function(done) {

		this.nodesProvider.on('end', function() {

			assert.file([
				'app/common/provider/provider.module.js',
				'app/common/provider/provider.provider.js'
			]);

			done();

		});

	});

	it('generates the provider module', function(done) {

		this.nodesProvider.on('end', function() {

			assert.fileContent(
					'app/common/provider/provider.module.js',
					/module\('provider'/
			);

			done();

		});

	});

	it('generates and capitalizes the provider', function(done) {

		this.nodesProvider.on('end', function() {

			assert.fileContent(
					'app/common/provider/provider.provider.js',
					/\.provider\('Provider'/
			);

			done();

		});

	});

});
