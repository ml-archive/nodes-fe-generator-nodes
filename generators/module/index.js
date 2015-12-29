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

	},

	prompting: {

		promptForLocation: function() {

			if(this.options.destinationPath) {
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'input',
				name: 'location',
				message: chalk.green('Which folder should i create the module in? (remember to inlcude the "type" folder, ie. common)'),
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

			var fileName = this.name + '.module.js';
			var destinationPath = this.options.destinationPath ?
				this.options.destinationPath :
				this.moduleLocation;

			this.destinationFullPath = path.join(destinationPath, fileName);

			this.scriptTemplate(
				this.templatePath('javascript/module.js'),
				this.destinationPath(path.join('app', destinationPath, fileName)),
				{
					name: this.cameledName
				}
			);

			this.scriptToIndex(this.destinationFullPath);

		}

	},

	end: function() {

		this.dependencyToApp(this.name);

	}

});