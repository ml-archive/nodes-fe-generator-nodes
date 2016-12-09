/**
 * @author Dennis Haulund Nielsen
 *
 * Nodes-galactic Yeoman Generator
 *
 * POI:
 * - Angular modules to be injected into app.js must be wrapped like this: "'moduleName'" otherwise
 *   the templating method will echo out unenclosed strings.
 * - Inline comments are not repeated, if anything is uncommented - scroll up :-)
 */

'use strict';

var bowerJsIgnore = [
	'jquery.cookie',
	'jquery.placeholder',
	'fastclick',
	'angulartics-adobe',
	'angulartics-chartbeat',
	'angulartics-flurry',
	'angulartics-ga-cordova',
	'angulartics-gtm',
	'angulartics-kissmetrics',
	'angulartics-mixpanel',
	'angulartics-scroll',
	'angulartics-segmentio',
	'angulartics-splunk',
	'angulartics-woopra',
	'angulartics-marketo',
	'angulartics-intercom',
	'angulartics-piwik',
	'angulartics-cnzz',
	'foundation.js',
	'waypoints',
	'sha1',
	'what-input'
];

var fs			= require('fs');
var path		= require('path');
var yeoman 		= require('yeoman-generator');
var util		= require('util');
var chalk		= require('chalk');
var _			= require('underscore');
var _string		= require('underscore.string');
var wiredep 	= require('wiredep');
var htmlWire	= require('html-wiring');

module.exports = yeoman.Base.extend({

	constructor: function() {

		// Core modules
		this.requiredModules = [
			"'ENVIRONMENT'",
			"'API_ENDPOINTS'",
			"'APPLICATION_SETTINGS'",
			"'ui.router'",
			"'angular-loading-bar'",
			"'angulartics'",
			"'angulartics.google.analytics'"
		];

		// Application modules
		this.projectModules = [
			"'config'",
			"'application'",
			"'index'"
		];

		// Non-bower files to be injected into index.html
		this.projectJsFiles = [
			'config/app.js',
			'config/config.js',
			'config/run.js',
			'config/environment.js',
			'config/api_endpoints.constant.js',
			'config/application_settings.constant.js',
			'modules/_application/application.module.js',
			'modules/_application/application.route.js',
			'modules/_application/application.controller.js',
			'modules/index/index.module.js',
			'modules/index/index.route.js',
			'modules/index/index.controller.js'
		];

		// All modules added during setup are added here
		this.ngModules = [];

		// Extend Yeoman onto this class
		yeoman.Base.apply(this, arguments);

		// Define cmd line options (--skip-install)
		this.option('skip-install', {
			desc: 'Skips the installation of dependencies',
			type: Boolean
		});

		// Define source root for templates
		this.sourceRoot(path.join(__dirname, '../../templates'));

		// Set default indentation for html-wiring
		htmlWire.defaults.indent = '\t\t';

	},

	initializing: function() {
		// Placeholder
	},

	prompting: {

		promptForAppName: function() {

			// Let this method be an asyncrounus method, halting later processes
			var done = this.async();

			// User input options
			var prompt = [{
				type: 'input',
				name: 'appName',
				message: 'Enter the name of your Angular App',
				default: this.appname
			}];

			// Prompt user for app name, if none is supplied we default to the folder name
			this.prompt(prompt, function(answer) {

				var name = answer.appName || this.appname;

				// Slugify and Lowercase the app name.
				name = name.toLowerCase();
				this.appname = _string.slugify(name);

				// Let Yeoman know we're done with this process
				done();

				// Bind parent scope to inner scope above so we can overwrite
			}.bind(this));

		},

		promptForJsLibraries: function() {

			var done = this.async();

			var prompt = [{
				type: 'checkbox',
				name: 'jsLibraries',
				message: 'Which Javascript libraries would you like to include?',
				choices: [{
					value: 'ncore',
					name: 'nCore',
					checked: true
				}, {
					value: 'foundation',
					name: 'Foundation Sites + UI Bootstrap + n-uib-foundation-tpls',
					checked: true
				}, {
					value: 'greensock',
					name: 'Greensock Animation Platform (I will wire up TweenMax for you)',
					checked: false
				}, {
					value: 'lodash',
					name: 'Lodash + ng-lodash',
					checked: false
				}]
			}];

			this.prompt(prompt, function(answers) {

				/**
				 * Checks if a module is among the user selected list
				 *
				 * @param {String} mod
				 * @returns {boolean}
				 */
				var hasModule = function(mod) {
					return answers.jsLibraries.indexOf(mod) !== -1;
				};

				this.ncore = hasModule('ncore');
				this.foundation = hasModule('foundation');
				this.greensock = hasModule('greensock');
				this.lodash = hasModule('lodash');

				if (this.ncore) {
					this.ngModules.push("'nCore'");
				}
				if (this.foundation) {
					this.ngModules.push("'ui.bootstrap'");
					this.ngModules.push("'n.ui.foundation.tpls'");
				}
				if (this.lodash) {
					this.ngModules.push("'ngLodash'");
				}

				done();

			}.bind(this));
		},

		promptForCoreNgModules: function() {

			var done = this.async();

			var prompt = [{
				type: 'checkbox',
				name: 'ngModules',
				message: 'Which core Angular modules would you like to include?',
				choices: [{
					value: 'ngAnimate',
					name: 'ngAnimate',
					checked: true
				}, {
					value: 'ngSanitize',
					name: 'ngSanitize',
					checked: true
				}, {
					value: 'ngTouch',
					name: 'ngTouch',
					checked: true
				}]
			}];

			this.prompt(prompt, function(answers) {
				/**
				 * Checks if a module is among the user selected list
				 *
				 * @param {String} mod
				 * @returns {boolean}
				 */
				var hasModule = function(mod) {
					return answers.ngModules.indexOf(mod) !== -1;
				};

				this.ngAnimate = hasModule('ngAnimate');
				this.ngSanitize = hasModule('ngSanitize');
				this.ngTouch = hasModule('ngTouch');

				if (this.ngAnimate) {
					this.ngModules.push("'ngAnimate'");
				}
				if (this.ngSanitize) {
					this.ngModules.push("'ngSanitize'");
				}
				if (this.ngTouch) {
					this.ngModules.push("'ngTouch'");
				}

				done();
			}.bind(this));

		},

		promptForOtherNgModules: function() {

			var done = this.async();

			var prompt = [{
				type: 'checkbox',
				name: 'ngAdditionalModules',
				message: 'Which third-party Angular modules would you like to include?',
				choices: [{
					value: 'ngstorage',
					name: 'ngStorage',
					checked: true
				}]
			}];

			this.prompt(prompt, function(answers) {
				/**
				 * Checks if a module is among the user selected list
				 *
				 * @param {String} mod
				 * @returns {boolean}
				 */
				var hasModule = function(mod) {
					return answers.ngAdditionalModules.indexOf(mod) !== -1;
				};

				this.ngstorage = hasModule('ngstorage');

				if (this.ngstorage) {
					this.ngModules.push("'ngStorage'");
				}

				done();
			}.bind(this));

		},

		buildNgModulesList: function() {

			// When all Angular related questions has been answered we combine the
			// selected module lists and add them to the list of modules to be wired
			// to app.js.
			this.ngModules = this.requiredModules.concat(this.ngModules).concat(this.projectModules);

			for (var i = 1; i < this.ngModules.length; i++) {
				// "enter tab tab tab"
				var str = '\n\t\t\t' + this.ngModules[i];
				this.ngModules[i] = str;
			}

		}

	},

	writing: {

		gruntfile: function() {

			// Template the Gruntfile

			var templateData = {
				appname: this.appname
			};

			this.fs.copyTpl(
				this.templatePath('common/root/_Gruntfile.js'),
				this.destinationPath('Gruntfile.js'),
				templateData
			);

		},

		npm: function() {

			// Template the npm package file

			var templateData = {
				appname: this.appname
			};

			this.fs.copy(
					this.templatePath('common/root/_npmrc'),
					this.destinationPath('.npmrc')
			);

			this.fs.copyTpl(
				this.templatePath('common/root/_package.json'),
				this.destinationPath('package.json'),
				templateData
			);

		},

		bower: function() {

			// Template the bower package file

			var templateData = {
				appname: this.appname,
				appPath: 'app/',
				ncore: this.ncore,
				greensock: this.greensock,
				lodash: this.lodash,
				foundation: this.foundation,
				ngstorage: this.ngstorage,
				ngSanitize: this.ngSanitize,
				ngAnimate: this.ngAnimate,
				ngTouch: this.ngTouch
			};

			this.fs.copy(
				this.templatePath('common/root/_bowerrc'),
				this.destinationPath('.bowerrc')
			);

			this.fs.copyTpl(
				this.templatePath('common/root/_bower.json'),
				this.destinationPath('bower.json'),
				templateData
			);

		},

		applicationCore: function() {

			// Template the app and run js files

			var dest = 'app/config/';

			var templateData = {
				appname: this.appname,
				ngModules: this.ngModules
			};

			this.fs.copyTpl(
				this.templatePath('javascript/app.js'),
				this.destinationPath(dest + 'app.js'),
				templateData
			);

			this.fs.copyTpl(
				this.templatePath('javascript/run.js'),
				this.destinationPath(dest + 'run.js'),
				templateData
			);
		},

		applicationModules: function() {

			// Copy the standard application modules

			var dest = 'app/modules';

			this.fs.copy(
				this.templatePath('common/app/modules'),
				this.destinationPath(dest)
			);

		},

		applicationConfig: function() {

			// Copy the standard application config files

			var dest = 'app/config';

			this.fs.copy(
				this.templatePath('common/app/config'),
				this.destinationPath(dest)
			);

		},

		// applicationCommon: function() {
		//
		// 	// Copy the standard common modules
		//
		// 	var dest = 'app/common';
		//
		// 	this.fs.copy(
		// 		this.templatePath('common/app/common'),
		// 		this.destinationPath(dest)
		// 	);
		//
		// },

		scss: function() {

			// Template main.scss, copy the rest of the standard style files

			var dest = 'app/styles';

			var templateData = {
				foundation: this.foundation
			};

			this.fs.copyTpl(
				this.templatePath('scss/main.scss'),
				this.destinationPath(dest + '/main.scss'),
				templateData
			);

			this.fs.copy(
				this.templatePath('common/app/styles'),
				this.destinationPath(dest)
			);

		},

		html: function() {

			// Build the index.html file

			var templateData = {
				appname: this.appname,
				foundation: this.foundation || false
			};

			// Template index.html
			this.fs.copyTpl(
				this.templatePath('html/index.html'),
				this.destinationPath('app/index.html'),
				templateData
			);

			// Load index.html into the memory
			this.indexFile = this.fs.read(this.destinationPath('app/index.html'));

			// Use html-wire to write a usemin block and add the non bower files
			this.indexFile = htmlWire.appendFiles({
				html: this.indexFile,
				fileType: 'js',
				optimizedPath: 'scripts/scripts.js',
				sourceFileList: this.projectJsFiles,
				searchPath: 'app'
			});

			// Write index.html
			this.fs.write(this.destinationPath('app/index.html'), this.indexFile);

		},

		assets: function() {

			// Copy standard assets
			this.fs.copy(
				this.templatePath('common/app/assets'),
				this.destinationPath('app/assets')
			);

		},

		misc: function() {

			// Copy all the misc files
			var dest = 'app/';

			this.fs.copy(
				this.templatePath('common/app/favicon.ico'),
				this.destinationPath(dest + '/favicon.ico')
			);

			this.fs.copy(
				this.templatePath('common/app/404.html'),
				this.destinationPath(dest + '/404.html')
			);
			this.fs.copy(
				this.templatePath('common/app/503.html'),
				this.destinationPath(dest + '/503.html')
			);

			this.fs.copy(
				this.templatePath('common/app/robots.txt'),
				this.destinationPath(dest + '/robots.txt')
			);

			this.fs.copy(
				this.templatePath('common/root/.editorconfig'),
				this.destinationPath('.editorconfig')
			);

			this.fs.copy(
				this.templatePath('common/root/.gitattributes'),
				this.destinationPath('.gitattributes')
			);

			this.fs.copy(
				this.templatePath('common/root/.jshintrc'),
				this.destinationPath('.jshintrc')
			);

			this.fs.copy(
					this.templatePath('common/root/.jscsrc'),
					this.destinationPath('.jscsrc')
			);

			this.fs.copy(
				this.templatePath('common/root/gitignore'),
				this.destinationPath('.gitignore')
			);

			this.fs.copy(
				this.templatePath('common/app/.htaccess'),
				this.destinationPath('app/.htaccess')
			);

		}

	},

	install: function() {

		// Unless skipped, run npm & bower install
		if(!this.options['skip-install']) {
			this.installDependencies({
				skipInstall: this.options['skip-install']
			});
		}

	},

	end: function() {

		// Read bower.json & .bowerrc into memory
		var bowerJson 	= this.fs.readJSON(this.destinationPath('bower.json'));
		var bowerRc		= this.fs.readJSON(this.destinationPath('.bowerrc'));

		var howToInstall =
			'\nAfter running ' +
			chalk.yellow.bold('npm install & bower install') +
			', inject your' +
			'\nfront end dependencies by running ' +
			chalk.yellow.bold('grunt wiredep') +
			'.';
		
		var getFontAwesomeIcons =
			'\nI see you chose to add ' +
			chalk.yellow.bold('Foundation Sites, UI Bootstrap and n-uib-foundation-tpls') +
			' to your project, awesome!' +
			'\nRun ' +
			chalk.green.bold('grunt copy:fa') +
			' to copy over the font-awesome font files required by these modules.';
				
		if(this.foundation === true) {
			this.log(getFontAwesomeIcons);
		}

		// If user used the --skip-install flag, tell them how to do it manually
		if (this.options['skip-install']) {
			this.log(howToInstall);
			return;
		}

		// Use wiredep to add bower js packages to index.html
		wiredep({
			bowerJson: bowerJson,
			directory: bowerRc.directory,
			exclude: bowerJsIgnore,
			src: 'app/index.html'
		});
		// Use wiredep to add bower scss packages to main.scss
		wiredep({
			bowerJson: bowerJson,
			directory: bowerRc.directory,
			ignorePath: /^(\.\.\/)+/,
			src: 'app/styles/main.scss'
		});

	}

});
