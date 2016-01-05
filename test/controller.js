'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:controller', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesController = helpers.run(require.resolve('../generators/controller'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'common',
						location: 'controller'
					})
					.withArguments(['controller']);

				this.nodesController.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default controller files', function(done) {

		this.nodesController.on('end', function() {

			assert.file([
				'app/common/controller/controller.module.js',
				'app/common/controller/controller.controller.js'
			]);

			done();

		});

	});

	it('generates the controller module', function(done) {

		this.nodesController.on('end', function() {

			assert.fileContent(
					'app/common/controller/controller.module.js',
					/module\('controller'/
			);

			done();

		});

	});

	it('capitalizes and appends Controller to the controller name', function(done) {

		this.nodesController.on('end', function() {

			assert.fileContent(
					'app/common/controller/controller.controller.js',
					/.controller\('ControllerController'/
			);

			done();

		});

	});

});
