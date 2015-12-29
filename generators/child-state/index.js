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
				message: chalk.green('Which folder should i create the child-state related files in?'),
				default: this.name
			};

			this.prompt(prompt, function(answer) {
				this.moduleLocation = answer.location;
				done();
			}.bind(this));

		},

		promptForModuleName: function() {

			var done = this.async();

			var prompt = {
				type: 'input',
				name: 'moduleName',
				message: chalk.green('Which parent module does this child-state belong to?')
			};

			this.prompt(prompt, function(answer) {
				this.moduleName = answer.moduleName;
				done();
			}.bind(this));

		}

	},

	writing: {

		controller: function() {

			if(!this.moduleName) {
				throw Error('You must provide a parent module');
			}

			var destinationPath = path.join(this.moduleLocation);

			this.composeWith('nodes:controller', {
				args: [this.name],
				options: {
					destinationPath: destinationPath,
					moduleType: 'modules',
					provideModule: true,
					provideModuleName: this.moduleName
				}
			});

		},

		html: function() {

			var destinationPath = path.join('app', 'modules', this.moduleLocation, this.name + '.template.html');

			this.composeWith('nodes:html', {
				args: [this.name],
				options: {
					destinationPath: destinationPath
				}
			});

		},

		scss: function() {

			var destinationPath = path.join('modules', this.moduleLocation);

			this.composeWith('nodes:scss', {
				args: [this.name],
				options: {
					destinationPath: destinationPath,
					scssType: 'module'
				}
			});

		}

	},

	end: function() {

		this.log(chalk.yellow('Dont forget to configure your child-state in its parents route config.'));

	}

});