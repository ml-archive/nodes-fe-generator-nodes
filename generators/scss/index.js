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

		this.option('scssType', {
			desc: 'Allows other subgenerators to provide a scss type',
			type: String
		});

		this.belongsToAngular = false;

	},

	prompting: {

		promptForScssType: function() {

			if (this.options.scssType) {
				this.scssType = this.options.scssType;
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'list',
				name: 'type',
				message: chalk.green('What kind of style would you like ?'),
				choices: [
					'mixins',
					'functions',
					'base',
					'elements',
					'components',
					'directive',
					'module'
				]
			};

			this.prompt(prompt, function(answer) {
				this.scssType = answer.type;
				done();
			}.bind(this));

		},

		promptForNgType: function() {

			if(this.scssType === 'directive' || this.scssType === 'module') {
				this.belongsToAngular = true;
			}

			if(this.options.scssType) {
				return;
			}

			if(this.scssType === 'directive' || this.scssType === 'module') {

				var done = this.async();

				var prompt = {
					type: 'list',
					name: 'ngType',
					message: chalk.green('You told me this scss file belongs to an Angular module, where is it located?'),
					choices: [
						'modules',
						'common'
					]
				};

				this.prompt(prompt, function(answer) {
					this.ngType = answer.ngType;
					done();
				}.bind(this));

			}

		},

		promptForLocation: function() {

			if(this.options.destinationPath) {
				this.scssLocation = this.options.destinationPath;
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'input',
				name: 'location',
				message: chalk.green('Which folder should i create the scss file in?'),
				default: this.name
			};

			this.prompt(prompt, function(answer) {
				this.scssLocation = answer.location;
				done();
			}.bind(this));

		}

	},

	writing: {

		scss: function() {

			this.fileName = '_' + this.name + '.scss';

			var corePath = this.belongsToAngular ? 'app' : 'app/styles';

			this.fullPath = '';

			if(this.belongsToAngular) {

				if(this.ngType) {
					this.fullPath = path.join(corePath, this.ngType, this.scssLocation);
					this.importPath = path.join(this.ngType, this.scssLocation);
				} else {
					this.fullPath = path.join(corePath, this.scssLocation);
					this.importPath = path.join(this.scssLocation);
				}

			} else {

				this.fullPath = path.join(corePath, this.scssType, this.scssLocation);
				this.importPath = path.join(this.scssType, this.scssLocation);

			}

			this.fullPathWithFile = path.join(this.fullPath, this.fileName);

			this.scriptTemplate(
				this.templatePath('scss/simple-template.scss'),
				this.fullPathWithFile,
				{
					name: this.name
				}
			);

		}

	},

	end: function() {

		this.importToScss(this.importPath, this.scssType);

	}

});