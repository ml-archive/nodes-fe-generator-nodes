# nodes:directive

Creates a module and a directive. You can optionally choose to create a template and scss file aswell.

From the command line the following options are available:

`--skip-module` - Skips creating a module file. Use this if the directive is part of another module.

### Options

This generator has the following API options (other generators can provide these options):

* `destinationPath` - Allows other subgenerators to provide a destination path without user input
* `provideModule` - Allows other subgenerators to provide a module
* `provideModuleName` - Allows other subgenerators to provide a module name (use in conjunction with `provideModule`)
* `moduleType` - Allows other subgenerators to provide the root folder in which the directive should be created in
* `skipHtml` - Skips creating a html template for this directive
* `skipScss` - Skips creating a scss file for this directive
* `hasTemplate` - Allows other generators to allow the template-url parameter (use this in ocnjunction with `skipHtml`)