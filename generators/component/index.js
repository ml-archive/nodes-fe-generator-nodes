/**
 * @author Dennis Haulund Nielsen
 */

'use strict';

var fs				= require('fs');
var path			= require('path');
var yeoman		 	= require('yeoman-generator');
var util			= require('util');
var chalk			= require('chalk');
var _string			= require('underscore.string');
var nodesGenerator 	= require('../../script-base.js');

module.exports = nodesGenerator.extend({

	constructor: function() {

		nodesGenerator.apply(this, arguments);

		this.option('destinationPath', {
			desc: 'Allows other subgenerators to provide a destination path without user input',
			type: String
		});

	},

	prompting: {

		promptForModuleLocation: function() {

			if(this.options.destinationPath) {
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'input',
				name: 'location',
				message: chalk.green('Which folder should i create the component related files in?'),
				default: this.name
			};

			this.prompt(prompt, function(answer) {
				this.moduleLocation = answer.location;
				done();
			}.bind(this));

		}

	},

	writing: {

		module: function() {

			var destinationPath = path.join('common', this.moduleLocation);

			this.composeWith('nodes:module', {
				args: [this.name],
				options: {
					destinationPath: destinationPath
				}
			}, {});

		},

		directive: function() {

			var destinationPath = path.join(this.moduleLocation);

			this.composeWith('nodes:directive', {
				args: [this.name],
				options: {
					destinationPath: destinationPath,
					moduleType: 'common',
					provideModule: true,
					provideModuleName: this.name,
					skipHtml: true,
					skipScss: true,
					hasTemplate: true
				}
			});

		},

		html: function() {

			var destinationPath = path.join('app', 'common', this.moduleLocation, this.name + '.template.html');

			this.composeWith('nodes:html', {
				args: [this.name],
				options: {
					destinationPath: destinationPath
				}
			});

		},

		scss: function() {

			var destinationPath = path.join('common', this.moduleLocation);

			this.composeWith('nodes:scss', {
				args: [this.name],
				options: {
					destinationPath: destinationPath,
					scssType: 'directive'
				}
			});

		}

	},

	end: function() {

		//this.scriptToIndex(this.destinationFullPath);

	}

});