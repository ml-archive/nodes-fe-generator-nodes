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

		promptForHtmlLocation: function() {

			if(this.options.destinationPath) {
				return;
			}

			var done = this.async();

			var prompt = {
				type: 'input',
				name: 'location',
				message: chalk.green('Which folder should i create the html file in?'),
				default: this.name
			};

			this.prompt(prompt, function(answer) {
				this.location = answer.location;
				done();
			}.bind(this));

		}

	},

	writing: {

		html: function() {

			var templateData = {
				name: this.name
			};

			var destinationPath = this.options.destinationPath ?
				this.options.destinationPath :
				path.join('app', this.location, this.name + '.template.html');

			this.fs.copyTpl(
				this.templatePath('html/module.html'),
				destinationPath,
				templateData
			);

		}

	},

	end: function() {

	}

});