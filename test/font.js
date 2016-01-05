'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:font', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesFont = helpers.run(require.resolve('../generators/font'))
					.withPrompts({
						location: 'arial'
					})
					.withArguments(['arial']);

				this.nodesFont.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates a folder for the fonts', function(done) {

		this.nodesFont.on('end', function() {

			assert.file([
				'app/assets/fonts/arial'
			]);

			done();

		});

	});

	it('adds a fontface rule to _fonts.scss', function(done) {

		this.nodesFont.on('end', function() {

			assert.fileContent(
					'app/styles/_fonts.scss',
					/font-family: 'arial';/
			);

			done();

		});

	});

});
