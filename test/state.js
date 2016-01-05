'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:state', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesState = helpers.run(require.resolve('../generators/state'))
					.withGenerators([
						require.resolve('../generators/module'),
						require.resolve('../generators/route'),
						require.resolve('../generators/controller'),
						require.resolve('../generators/html'),
						require.resolve('../generators/scss')
					])
					.withPrompts({
						location: 'list'
					})
					.withArguments(['list']);

				this.nodesState.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates default state items', function(done) {

		this.nodesState.on('end', function() {

			assert.file([
				'app/modules/list/list.module.js',
				'app/modules/list/list.route.js',
				'app/modules/list/list.controller.js',
				'app/modules/list/list.template.html',
				'app/modules/list/_list.scss'
			]);

			done();

		});

	});

});
