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
				message: chalk.green('Which folder should i create the model files in?'),
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

			var destinationPath = path.join('models', this.moduleLocation);

			this.composeWith('nodes:module', {
				args: [this.pluralizedName],
				options: {
					destinationPath: destinationPath
				}
			}, {});

		},

		service: function() {

			var destinationPath = path.join(this.moduleLocation);

			this.composeWith('nodes:service', {
				args: [this.pluralizedName],
				options: {
					destinationPath: destinationPath,
					moduleType: 'models',
					provideModule: true,
					provideModuleName: this.pluralizedName,
					injectCommonModules: true
				}
			});

		}

	}

});