'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:html', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesHtml = helpers.run(require.resolve('../generators/html'))
					.withPrompts({
						location: 'html'
					})
					.withArguments(['html']);

				this.nodesHtml.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates the html file', function(done) {

		this.nodesHtml.on('end', function() {

			assert.file([
				'app/html/html.template.html'
			]);

			done();

		});

	});

});
