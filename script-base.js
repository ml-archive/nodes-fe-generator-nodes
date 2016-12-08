'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');
var _string = require('underscore.string');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {

	yeoman.Base.apply(this, arguments);

	this.sourceRoot(path.join(__dirname, 'templates'));
	this.argument('name', {type: String, required: true});

	this.cameledName = _string.camelize(this.name);
	this.classedName = _string.classify(this.name);
	this.dashedName = _string.dasherize(this.name);
	this.lowercasedName = this.name.toLowerCase();
	this.pluralizedName = this.name + 's';

};

util.inherits(Generator, yeoman.Base);

Generator.prototype.scriptTemplate = function(src, dest, data) {

	this.fs.copyTpl(
		src,
		dest,
		data
	);

};

Generator.prototype.scriptToIndex = function(file) {

	var filePath = path.join('app', 'index.html');

	try {

		angularUtils.rewriteFile({
			file: filePath,
			needle: '<!-- endbuild -->',
			splicable: [
				'\t\t<script src="' + file.replace(/\\/g, '/') + '"></script>'
			]
		});

	} catch (e) {

		this.log.error(chalk.yellow(
			'\nUnable to find ' + filePath + '. Reference to ' + file + '.js ' + 'not added.\n'
		));

	}

};

Generator.prototype.dependencyToApp = function(dependency) {

	var filePath = path.join('app/config', 'app.js');

	try {

		angularUtils.rewriteFile({
			file: filePath,
			needle: '/* ---> Do not delete this comment (ngImports) <--- */',
			splicable: [
				"\t\t\t'" + dependency + "',"
			]
		});

	} catch (e) {

		this.log.error(chalk.yellow(
			'\nUnable to find ' + filePath + '. Dependency ' + dependency + 'not added.\n'
		));

	}

};

Generator.prototype.importToScss = function(destinationPath, type) {

	var needleIdentifier = type;
	var splicable = '';

	switch (type) {
		case 'directive':
			needleIdentifier = 'Directives';
			splicable = '../';
			break;
		case 'ngComponent':
			needleIdentifier = 'Components';
			splicable = '../';
			break;
		case 'module':
			needleIdentifier = 'Modules';
			splicable = '../';
			break;
	}

	var filePath = path.join('app/styles', 'main.scss');

	try {

		angularUtils.rewriteFile({
			file: filePath,
			needle: '/* ---> Do not delete this comment (' + needleIdentifier + ') <--- */',
			splicable: [
				'@import "' + splicable + path.join(destinationPath ,this.name) + '";'
			]
		});

	} catch (e) {

		this.log.error(chalk.yellow(
			'\nUnable to find ' + filePath + '. Scss file not imported.\n'
		));

	}

};

Generator.prototype.importToFontScss = function(name) {

	var filePath = path.join('app/styles', '_fonts.scss');

	try {

		angularUtils.rewriteFile({
			file: filePath,
			needle: '/* ---> Do not delete this comment (Fonts) <--- */',
			splicable: [
				"\n@font-face { \n" +
				"\tfont-family: '" + this.name + "'; \n" +
				"\tsrc: url('../assets/fonts/" + this.name + "/" + this.name + ".eot'); /* IE9 Compat Modes */ \n" +
				"\tsrc: local('☺'), \n" +
				"\t\turl('../assets/fonts/" + this.name + "/" + this.name + ".eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ \n" +
				"\t\turl('../assets/fonts/" + this.name + "/" + this.name + ".woff') format('woff'), /* Modern Browsers */ \n" +
				"\t\turl('../assets/fonts/" + this.name + "/" + this.name + ".ttf')  format('truetype'), /* Safari, Android, iOS */ \n" +
				"\t\turl('../assets/fonts/" + this.name + "/" + this.name + ".svg#svgFontName') format('svg'); /* Legacy iOS */ \n" +
				"\tfont-weight: 'normal'; \n" +
				"\tfont-style: 'normal'; \n" +
				"}"
			]
		});

	} catch(e) {

		this.log.error(chalk.yellow(
			'\nUnable to find ' + filePath + '. Scss file not imported.\n'
		));

	}

};

Generator.extend = require('class-extend').extend;
