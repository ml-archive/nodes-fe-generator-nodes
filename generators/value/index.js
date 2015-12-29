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

		this.option('skip-module', {
			desc: 'Skips registerring the value as a standalone angular module',
			type: Boolean
		});

		this.option('destinationPath', {
			desc: 'Allows other subgenerators to provide a destination path without user input',
			type: String
		});

		this.option('provideModule', {
			desc: 'Allows other subgenerators to provide a module',
			type: Boolean
		});

		this.option('provideModuleName', {
			desc: 'Allows other subgenerators to provide a module',
			type: String
		});

		this.option('moduleType', {
			desc: 'Allows other subgenerators to provide a module type',
			type: String
		});

	},

	prompting: {

		promptForModuleType: function() {

			if(this.options.moduleType) {
				this.moduleType = this.options.moduleType;
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'list',
				name: 'type',
				message: chalk.green('What type of value is this?'),
				choices: [
					'config',
					'common',
					'models',
					'modules'
				]
			};

			this.prompt(prompt, function(answer) {
				this.moduleType = answer.type;
				done();
			}.bind(this));

		},

		promptForModuleLocation: function() {

			if(this.options.destinationPath) {
				this.moduleLocation = this.options.destinationPath;
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'input',
				name: 'location',
				message: chalk.green('Which folder should i create the value in?'),
				default: this.name
			};

			this.prompt(prompt, function(answer) {
				this.moduleLocation = answer.location;
				done();
			}.bind(this));

		},

		promptForModuleName: function() {

			if(!this.options['skip-module']) {
				return;
			}
			if(this.options.provideModule) {
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'input',
				name: 'moduleName',
				message: chalk.yellow('You told me to skip creating an Angular module \nWhich module does this value belong to?'),
				default: this.appname
			};

			this.prompt(prompt, function(answer) {
				this.moduleName = answer.moduleName;
				done();
			}.bind(this));

		}

	},

	writing: {

		module: function() {

			if(this.options['skip-module'] || this.options.provideModule) {
				return;
			}

			var destinationPath = path.join(this.moduleType, this.moduleLocation);

			this.composeWith('nodes:module', {
				args: [this.name],
				options: {
					destinationPath: destinationPath
				}
			}, {});

		},

		constant: function() {

			if(this.options.provideModule) {
				this.moduleName = this.options.provideModuleName;
			}

			this.moduleName = (this.options['skip-module'] || this.options.provideModule) ? this.moduleName : this.cameledName;
			this.fileName = this.name + '.value.js';
			this.destinationFullPath = path.join(this.moduleType, this.moduleLocation, this.fileName);

			this.scriptTemplate(
				this.templatePath('javascript/value.js'),
				path.join('app', this.destinationFullPath),
				{
					moduleName: this.moduleName,
					name: this.classedName
				}
			);

		}

	},

	end: function() {

		this.scriptToIndex(this.destinationFullPath);

	}

});