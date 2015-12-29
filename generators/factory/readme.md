# nodes:factory

Creates a module and a factory. The factory comes with some example code showing how to mimic a Class.

From the command line the following options are available:

`--skip-module` - Skips creating a module file. Use this if the factory is part of another module.

### Options

This generator has the following API options (other generators can provide these options):

* `destinationPath` - Allows other subgenerators to provide a destination path without user input
* `provideModule` - Allows other subgenerators to provide a module
* `provideModuleName` - Allows other subgenerators to provide a module name (use in conjunction with `provideModule`)
* `moduleType` - Allows other subgenerators to provide the root folder in which the factory should be created in