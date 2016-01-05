'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:constant', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesConstant = helpers.run(require.resolve('../generators/constant'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'config',
						location: '/'
					})
					.withArguments(['constant']);

				this.nodesConstant.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default constant files', function(done) {

		this.nodesConstant.on('end', function() {

			assert.file([
				'app/config/constant.module.js',
				'app/config/constant.constant.js'
			]);

			done();

		});

	});

	it('generates the constant module', function(done) {
		this.nodesConstant.on('end', function() {

			assert.fileContent(
					'app/config/constant.module.js',
					/module\('constant'/
			);

			done();

		});
	});

	it('generates the constant with a capilalized name', function(done) {
		this.nodesConstant.on('end', function() {

			assert.fileContent(
					'app/config/constant.constant.js',
					/constant\('Constant'/
			);

			done();

		});
	});

});
