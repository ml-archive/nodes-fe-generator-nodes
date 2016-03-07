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
			desc: 'Skips registerring the component as a standalone angular module',
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

		this.option('skipHtml', {
			desc: 'Skips creating a html template for this component',
			type: String
		});

		this.option('skipScss', {
			desc: 'Skips creating a scss file for this component',
			type: String
		});

		this.option('hasTemplate', {
			desc: 'Allows other generators to provide the template-url parameter',
			type: Boolean
		});

	},

	prompting: {

		promptForModuleHtml: function() {

			if(this.options.skipHtml) {
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'confirm',
				name: 'html',
				message: chalk.green('Does this component need a html template?'),
				default: true
			};

			this.prompt(prompt, function(answer) {
				this.html = answer.html;
				done();
			}.bind(this));

		},

		promptForModuleScss: function() {

			if(this.options.skipScss) {
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'confirm',
				name: 'scss',
				message: chalk.green('Does this component need a scss file?'),
				default: true
			};

			this.prompt(prompt, function(answer) {
				this.scss = answer.scss;
				done();
			}.bind(this));

		},

		promptForModuleType: function() {

			if(this.options.moduleType) {
				this.moduleType = this.options.moduleType;
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'list',
				name: 'type',
				message: chalk.green('What type of component is this?'),
				choices: [
					'common',
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
				message: chalk.green('Which folder should i create the component in?'),
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
				message: chalk.yellow('You told me to skip creating an Angular module \nWhich module does this component belong to?'),
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

		directive: function() {

			if(this.options.provideModule) {
				this.moduleName = this.options.provideModuleName;
			}
			if(this.options.hasTemplate) {
				this.html = true;
			}

			this.moduleName = (this.options['skip-module'] || this.options.provideModule) ? this.moduleName : this.cameledName;
			this.fileName = this.name + '.component.js';
			this.destinationFullPath = path.join(this.moduleType, this.moduleLocation, this.fileName);

			this.scriptTemplate(
					this.templatePath('javascript/component.js'),
					path.join('app', this.destinationFullPath),
					{
						moduleName: this.moduleName,
						name: this.name,
						classedName: this.classedName,
						cameledName: this.cameledName,
						html: this.html,
						filePath: path.join(this.moduleType, this.moduleLocation)
					}
			);

		},

		html: function() {

			if(!this.html) {
				return;
			}

			var destinationPath = path.join('app', this.moduleType, this.moduleLocation, this.name + '.template.html');

			this.composeWith('nodes:html', {
				args: [this.name],
				options: {
					destinationPath: destinationPath
				}
			}, {});

		},

		scss: function() {

			if(!this.scss) {
				return;
			}

			var destinationPath = path.join(this.moduleType, this.moduleLocation);

			this.composeWith('nodes:scss', {
				args: [this.name],
				options: {
					destinationPath: destinationPath,
					scssType: 'ngComponent'
				}
			}, {});

		}

	},

	end: function() {

		this.scriptToIndex(this.destinationFullPath);

	}

});