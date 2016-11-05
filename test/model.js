'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:model', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesModel = helpers.run(require.resolve('../generators/model'))
					.withGenerators([
						require.resolve('../generators/module'),
						require.resolve('../generators/factory'),
						require.resolve('../generators/service')
					])
					.withOptions({

					})
					.withPrompts({
						location: 'user',
						injectCommonModules: false
					})
					.withArguments(['user']);

				this.nodesModel.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates default model items', function(done) {

		this.nodesModel.on('end', function() {

			assert.file([
				'app/models/user/users.module.js',
				'app/models/user/users.service.js',
				'app/models/user/user.factory.js'
			]);

			done();

		});

	});

	it('pluralizes the module', function(done) {

		this.nodesModel.on('end', function() {

			assert.fileContent(
				'app/models/user/users.module.js',
				/angular.module\('users'/
			);

			done();

		});

	});

	it('pluralizes the service', function(done) {

		this.nodesModel.on('end', function() {

			assert.fileContent(
					'app/models/user/users.service.js',
					/service\('UsersService'/
			);

			done();

		});

	});

	it('does not pluralize the factory', function(done) {

		this.nodesModel.on('end', function() {

			assert.fileContent(
					'app/models/user/user.factory.js',
					/.factory\('UserFactory'/
			);

			done();

		});

	});
});
