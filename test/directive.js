'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:directive', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesDirective = helpers.run(require.resolve('../generators/directive'))
					.withGenerators([
						require.resolve('../generators/module'),
						require.resolve('../generators/html'),
						require.resolve('../generators/scss')
					])
					.withPrompts({
						html: false,
						scss: false,
						type: 'common',
						location: 'directive'
					})
					.withArguments(['my-directive']);

				this.nodesDirective.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default directive files', function(done) {

		this.nodesDirective.on('end', function() {

			assert.file([
				'app/common/directive/my-directive.module.js',
				'app/common/directive/my-directive.directive.js'
			]);

			done();

		});

	});

	it('generates the directive module', function(done) {

		this.nodesDirective.on('end', function() {

			assert.fileContent(
					'app/common/directive/my-directive.module.js',
					/module\('myDirective'/
			);

			done();

		});

	});

	it('converts the directive name to camelCase', function(done) {

		this.nodesDirective.on('end', function() {

			assert.fileContent(
					'app/common/directive/my-directive.directive.js',
					/.directive\('myDirective'/
			);

			done();

		});

	});

});
