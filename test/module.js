'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:module', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesModule = helpers.run(require.resolve('../generators/module'))
					.withPrompts({
						location: 'module'
					})
					.withArguments(['module']);

				this.nodesModule.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the module file', function(done) {

		this.nodesModule.on('end', function() {

			assert.file([
				'app/module/module.module.js'
			]);

			done();

		});

	});

	it('generates the module', function(done) {

		this.nodesModule.on('end', function() {

			assert.fileContent(
					'app/module/module.module.js',
					/module\('module'/
			);

			done();

		});

	});

});
