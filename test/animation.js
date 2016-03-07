'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:animation', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesAnimation = helpers.run(require.resolve('../generators/animation'))
					.withGenerators([
						require.resolve('../generators/module')
					])
					.withPrompts({
						type: 'common',
						location: 'animation'
					})
					.withArguments(['my-animation']);

				this.nodesAnimation.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the default animation files', function(done) {

		this.nodesAnimation.on('end', function() {

			assert.file([
				'app/common/animation/my-animation.module.js',
				'app/common/animation/my-animation.animation.js'
			]);

			done();

		});

	});

	it('generates the animation module', function(done) {

		this.nodesAnimation.on('end', function() {

			assert.fileContent(
					'app/common/animation/my-animation.module.js',
					/module\('myAnimation'/
			);

			done();

		});

	});

	it('capitalizes and prepends a dot to the animation name', function(done) {

		this.nodesAnimation.on('end', function() {

			assert.fileContent(
					'app/common/animation/my-animation.animation.js',
					/.animation\('.my-animation'/
			);

			done();

		});

	});

});
