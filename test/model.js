'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:model', function() {

	// this.timeout(15000);

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {
				
				this.nodesModel = helpers.run(require.resolve('../generators/model'))
					.withGenerators([
						require.resolve('../generators/module'),
						require.resolve('../generators/service')
					])
					.withPrompts({
						location: 'user'
					})
					.withArguments(['user']);

				this.nodesModel.inDirSet = true;

				done();
				
			}.bind(this));
		
	});

	it('generates default model items', function(done) {

		this.nodesModel.on('end', function() {

			assert.file([
				'app/models/user/user.module.js',
				'app/models/user/user.service.js'
			]);

			done();

		});

	});

});
