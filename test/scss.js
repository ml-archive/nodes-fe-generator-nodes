'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:scss', function() {

	/*
		Den skal
	 */
	describe('non-angular scss files', function() {

		beforeEach(function(done) {

			generateFullProject()
				.on('end', function() {

					this.nodesScss = helpers.run(require.resolve('../generators/scss'))
							.withPrompts({
								type: 'elements',
								location: 'element'
							})
							.withArguments(['element']);

					this.nodesScss.inDirSet = true;

					done();

				}.bind(this));

		});
		
		it('generates the scss file in the styles directory', function(done) {

			this.nodesScss.on('end', function() {

				assert.file([
					'app/styles/elements/element/_element.scss'
				]);

				done();
			});

		});

		it('creates a selector in the scss file', function(done) {

			this.nodesScss.on('end', function() {

				assert.fileContent(
						'app/styles/elements/element/_element.scss',
						/\.element \{/
				);

				done();

			});

		});

	});

	describe('angular scss files', function() {

		beforeEach(function(done) {

			generateFullProject()
				.on('end', function() {

					this.nodesScss = helpers.run(require.resolve('../generators/scss'))
							.withPrompts({
								type: 'directive',
								ngType: 'common',
								location: 'component'
							})
							.withArguments(['component']);

					this.nodesScss.inDirSet = true;

					done();

				}.bind(this));

		});

		it('generates the scss file in the common directory', function(done) {

			this.nodesScss.on('end', function() {

				assert.file([
					'app/common/component/_component.scss'
				]);

				done();
			});

		});

		it('creates a selector in the scss file', function(done) {

			this.nodesScss.on('end', function() {

				assert.fileContent(
						'app/common/component/_component.scss',
						/\.component \{/
				);

				done();

			});

		});

	});

});
