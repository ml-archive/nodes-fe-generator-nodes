'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:route', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesRoute = helpers.run(require.resolve('../generators/route'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						location: 'route'
					})
					.withArguments(['route']);

				this.nodesRoute.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default route files', function(done) {

		this.nodesRoute.on('end', function() {

			assert.file([
				'app/modules/route/route.module.js',
				'app/modules/route/route.route.js'
			]);

			done();

		});

	});

	it('generates the route module', function(done) {

		this.nodesRoute.on('end', function() {

			assert.fileContent(
					'app/modules/route/route.module.js',
					/module\('route'/
			);

			done();

		});

	});

	it('configures the route', function(done) {

		this.nodesRoute.on('end', function() {

			assert.fileContent(
					'app/modules/route/route.route.js',
					/\$stateProvider\.state\(RouteRoute\);/
			);

			done();

		});

	});

});
