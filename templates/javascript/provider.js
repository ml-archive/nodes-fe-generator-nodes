(function() {
	'use strict';

	/**
	 * @name
	 * @author
	 * @description
	 *
	 */
	angular
		.module('<%= moduleName %>')
		.provider('<%= name %>', <%= classedName %>);

	/* @ngInject */
	function <%= classedName %>() {

		// Private variables

		// Default options (configurable in confing phase)
		var defaults = {};

		// Getter / Setter
		this.configure = function(config) {
			if(arguments.length === 0) {
				return defaults;
			}
			angular.extend(defaults, config);
		};

		this.$get = [function() {
			return {
				settings: defaults
				//publicMethod: publicMethod
			};
		}];

		/*
			 "Constructor" / Private Method example

			 function _Something(stuff) {

				 var id = Math.floor(Math.random()*1000);

				 while (messages.indexOf(id) > -1) {
				 id = Math.floor(Math.random()*1000);
				 }

				 this.id = id;

				 angular.extend(this, stuff);

			 }
		 */

		/*
			Public Method using constructor

			function publicMethod(stuff) {

				var newSomething = new Something(stuff);

				return newSomething;

			}
		 */

	}

})();