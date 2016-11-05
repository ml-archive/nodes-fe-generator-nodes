'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:service', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesservice = helpers.run(require.resolve('../generators/service'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'models',
						location: 'service',
						injectCommonModules: false
					})
					.withArguments(['service']);

				this.nodesservice.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default service files', function(done) {

		this.nodesservice.on('end', function() {

			assert.file([
				'app/models/service/service.module.js',
				'app/models/service/service.service.js'
			]);

			done();

		});

	});

	it('generates the service module', function(done) {

		this.nodesservice.on('end', function() {

			assert.fileContent(
					'app/models/service/service.module.js',
					/module\('service'/
			);

			done();

		});

	});

	it('capitalizes and appends service to the service name', function(done) {

		this.nodesservice.on('end', function() {

			assert.fileContent(
					'app/models/service/service.service.js',
					/\.service\('ServiceService'/
			);

			done();

		});

	});

});
