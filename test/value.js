'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:value', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesvalue = helpers.run(require.resolve('../generators/value'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'config',
						location: '/'
					})
					.withArguments(['value']);

				this.nodesvalue.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default value files', function(done) {

		this.nodesvalue.on('end', function() {

			assert.file([
				'app/config/value.module.js',
				'app/config/value.value.js'
			]);

			done();

		});

	});

	it('generates the value module', function(done) {
		this.nodesvalue.on('end', function() {

			assert.fileContent(
					'app/config/value.module.js',
					/module\('value'/
			);

			done();

		});
	});

	it('generates the value with a capilalized name', function(done) {
		this.nodesvalue.on('end', function() {

			assert.fileContent(
					'app/config/value.value.js',
					/value\('Value'/
			);

			done();

		});
	});

});
