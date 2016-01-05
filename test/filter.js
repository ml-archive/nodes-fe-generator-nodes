'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:filter', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesFilter = helpers.run(require.resolve('../generators/filter'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'common',
						location: 'filter'
					})
					.withArguments(['filter']);

				this.nodesFilter.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default filter files', function(done) {

		this.nodesFilter.on('end', function() {

			assert.file([
				'app/common/filter/filter.module.js',
				'app/common/filter/filter.filter.js'
			]);

			done();

		});

	});

	it('generates the filter module', function(done) {

		this.nodesFilter.on('end', function() {

			assert.fileContent(
					'app/common/filter/filter.module.js',
					/module\('filter'/
			);

			done();

		});

	});

	it('generates the filter', function(done) {

		this.nodesFilter.on('end', function() {

			assert.fileContent(
					'app/common/filter/filter.filter.js',
					/\.filter\('filter'/
			);

			done();

		});

	});

});
