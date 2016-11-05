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
		
		console.log('FISSE');

		nodesGenerator.apply(this, arguments);

		this.option('skip-module', {
			desc: 'Skips registerring the service as a standalone angular module',
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
		
		this.option('injectCommonModules', {
			desc: 'Will inject commonly used modules ($exceptionhandler, $q, $http, API_ENDPOINTS)',
			type: Boolean
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
				message: chalk.green('What type of service is this?'),
				choices: [
					'common',
					'modules',
					'models'
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
				message: chalk.green('Which folder should i create the service in?'),
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
				message: chalk.yellow('You told me to skip creating an Angular module \nWhich module does this service belong to?'),
				default: this.appname
			};

			this.prompt(prompt, function(answer) {
				this.moduleName = answer.moduleName;
				done();
			}.bind(this));

		},
		
		promptForCommonModules: function() {
			
			console.log('AAAAAAAAAA');
			
			if(this.options.injectCommonModules) {
				return;
			}
			
			var done = this.async();
			
			var prompt = {
				type: 'confirm',
				name: 'injectCommonModules',
				message: chalk.green('Would you like to include the $exceptionHandler, $q, $http and API_ENDPOINTS modules?'),
				default: true
			};
			
			this.prompt(prompt, function(answer) {
				this.injectCommonModules = answer.injectCommonModules;
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

		service: function() {

			if(this.options.provideModule) {
				this.moduleName = this.options.provideModuleName;
			}
			if(this.options.injectCommonModules) {
				this.injectCommonModules = this.options.injectCommonModules;
			}
			
			this.moduleName = (this.options['skip-module'] || this.options.provideModule) ? this.moduleName : this.cameledName;
			this.fileName = this.name + '.service.js';
			this.destinationFullPath = path.join(this.moduleType, this.moduleLocation, this.fileName);

			this.scriptTemplate(
				this.templatePath('javascript/service.js'),
				path.join('app', this.destinationFullPath),
				{
					moduleName: this.moduleName,
					name: this.classedName,
					lowercaseName: this.lowercasedName,
					classedName: this.classedName,
					injectCommonModules: this.injectCommonModules
				}
			);

		}

	},

	end: function() {

		this.scriptToIndex(this.destinationFullPath);

	}

});