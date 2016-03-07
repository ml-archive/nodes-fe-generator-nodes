'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var generateFullProject = require('./utils').generateFullProject;

describe('nodes:ui-component', function() {

	beforeEach(function(done) {

		generateFullProject()
			.on('end', function() {

				this.nodesComponentComponent = helpers.run(require.resolve('../generators/ui-component'))
					.withGenerators([
						require.resolve('../generators/module'),
						require.resolve('../generators/component'),
						require.resolve('../generators/html'),
						require.resolve('../generators/scss')
					])
					.withOptions({

					})
					.withPrompts({
						html: true,
						scss: true,
						type: 'common',
						location: 'ui-component',
						moduleName: 'uiComponent'
					})
					.withArguments(['ui-component']);

				this.nodesComponentComponent.inDirSet = true;

				done();

			}.bind(this));

	});

	it('generates default component items', function(done) {

		this.nodesComponentComponent.on('end', function() {

			assert.file([
				'app/common/ui-component/ui-component.module.js',
				'app/common/ui-component/ui-component.component.js',
				'app/common/ui-component/ui-component.template.html',
				'app/common/ui-component/_ui-component.scss'
			]);

			done();

		});

	});

});
