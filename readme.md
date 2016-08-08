# generator nodes

[![Build Status](https://travis-ci.org/nodes-frontend/generator-nodes.svg?branch=master)](https://travis-ci.org/nodes-frontend/generator-nodes)
[![Coverage Status](https://coveralls.io/repos/nodes-frontend/generator-nodes/badge.svg?branch=master&service=github)](https://coveralls.io/github/nodes-frontend/generator-nodes?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Opinionated workflow and toolkit used for Angular front-end development at Nodes, feel free to use it for your own projects aswell.

## Usage:

#### Prerequisites:

Install `yo`, `grunt-cli`, `bower` and `generator-nodes` globally:
```
npm install -g grunt-cli bower yo generator-mpdes
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo nodes`:
```
yo nodes
```

## Grunt

The following grunt tasks are available:
- grunt serve - starts a browsersync server, serving files from the `app` folder
- grunt dist - starts a browsersync server, serving the production ready files from the `dist` folder
- grunt build - builds the project (please have a look at the gruntfile to see the steps involved in this process, and have a look at the minification-safe section of this readme) 

## Generators

Available basic generators:


* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/app" target="_blank">nodes (aka nodes:app)</a>

---

* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/constant" target="_blank">nodes:constant</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/value" target="_blank">nodes:value</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/controller" target="_blank">nodes:controller</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/factory" target="_blank">nodes:factory</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/service" target="_blank">nodes:service</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/decorator" target="_blank">nodes:decorator</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/provider" target="_blank">nodes:provider</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/directive" target="_blank">nodes:directive</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/filter" target="_blank">nodes:filter</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/route" target="_blank">nodes:route</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/module" target="_blank">nodes:module</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/html" target="_blank">nodes:html</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/scss" target="_blank">nodes:scss</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/font" target="_blank">nodes:font</a>

---

Available advanced generators:
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/state" target="_blank">nodes:state</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/child-state" target="_blank">nodes:child-state</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/model" target="_blank">nodes:model</a>
* <a href="https://github.com/nodes-frontend/generator-nodes/tree/master/generators/component" target="_blank">nodes:component</a>

## Project structure

    ├── app
        ├── assets              - fonts, images, etc…
        ├── common              - Common components, sharable across modules (directives, filters, etc.)
        ├── config              - Project specific configuration files (endpoints, config/bootstrap etc.)
        ├── models              - API Communication, Buisness Models etc.
        ├── modules             - Views / Routes
        └── styles				- Application wide styles

## State structure

In our experience, having some "high level" wrapper states around an application greatly improves flexibility and removes alot of noice from the $rootScope. With this in mind we have structured our states like this:

* All states are children of the application state which is an abstract state
* The application state is rendered in the `[ui-view="root"]` element.
* All children of application are rendered in the `[ui-view="application"]` which is located in the _application.template.html file.

## Minification safe

**tl;dr**: You don't need to write annotated code as the build step will
handle it for you.

By default, generators produce unannotated code. Without annotations, AngularJS's DI system will break when minified. Typically, these annotations that make minification safe are added automatically at build-time, after application files are concatenated, but before they are minified. The annotations are important because minified code will rename variables, making it impossible for AngularJS to infer module names based solely on function parameters.

The recommended build process uses `ng-annotate`, a tool that automatically adds these annotations. However, if you'd rather not use it, you have to add these annotations manually yourself. Why would you do that though? If you find a bug
in the annotated code, please file an issue at [ng-annotate](https://github.com/olov/ng-annotate/issues).

## Add to index

By default, new scripts are added to the index.html file. However, this may not always be suitable. Some use cases:

* Manually added to the file
* Auto-added by a 3rd party plugin
* Using this generator as a subgenerator

To skip adding them to the index, pass in the skip-add argument:
```bash
yo nodes:service serviceName --skip-add
```

## bower components

The following modules are always installed by the generator:

* ui.router
* angular-loading-bar
* cgBusy
* angulartics + angulartics.google.analytics

The following components can be installed when running the generator:

* nCore
* nTranslate
* Foundation + Angular-foundation
* Greensock Animation Platform
* Lodash + ngLodash
* ngAnimate
* ngSanitize
* ngTouch
* ngStorage

We keep a list of javascript modules to be ignored by wiredep in our gruntfile. Use this ie. to ignore jQuery plugins from third-party modules.
