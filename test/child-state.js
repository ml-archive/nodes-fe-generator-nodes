'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:child-state', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesChildState = helpers.run(require.resolve('../generators/child-state'))
					.withGenerators([
						require.resolve('../generators/controller'),
						require.resolve('../generators/html'),
						require.resolve('../generators/scss')
					])
					.withPrompts({
						location: 'list/single',
						moduleName: 'list'
					})
					.withArguments(['single']);

				this.nodesChildState.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates default child-state files', function(done) {

		this.nodesChildState.on('end', function() {

			assert.file([
				'app/modules/list/single/single.controller.js',
				'app/modules/list/single/single.template.html',
				'app/modules/list/single/_single.scss'
			]);

			done();

		});

	});

});
