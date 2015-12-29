/**
 * @author Dennis Haulund Nielsen
 */

'use strict';

var fs				= require('fs');
var path			= require('path');
var mkdirp			= require('mkdirp');
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
				message: chalk.green('Which folder should i create for the fonts?'),
				default: this.name
			};

			this.prompt(prompt, function(answer) {
				this.fontDestination = answer.location;
				done();
			}.bind(this));

		}

	},

	writing: {

		fontFolder: function() {
			mkdirp.sync('app/assets/fonts/' + this.name);
		}

	},

	end: function() {

		this.importToFontScss(this.name);

	}

});