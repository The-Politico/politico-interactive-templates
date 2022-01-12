#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var semver = _interopDefault(require('semver'));

var name = "@politico/interactive-templates";
var version = "1.5.0";
var description = "Templating engine for generating codebases.";
var main = "dist/index.js";
var module$1 = "dist/module.js";
var bin = {
	pit: "dist/cli.js"
};
var scripts = {
	dev: "nodemon --ignore dist --exec npm run build",
	build: "rollup --config config/rollup.es.js",
	postbuild: "node ./bin/post-build.js",
	test: "nyc mocha $(find src/**/**/test.js -name '*.js') --require \"@babel/register\" --timeout 30000",
	"test-specific": "mocha $(find src/**/**/test.js -name '*.js') --require \"@babel/register\" --timeout 30000 -g",
	posttest: "rmdir test 2>/dev/null ; exit 0;",
	"posttest-specific": "npm run posttest"
};
var devDependencies = {
	"@babel/cli": "^7.1.0",
	"@babel/core": "^7.1.0",
	"@babel/plugin-proposal-class-properties": "^7.5.0",
	"@babel/plugin-transform-runtime": "^7.5.5",
	"@babel/preset-env": "^7.5.5",
	"@babel/preset-react": "^7.10.1",
	"@babel/register": "^7.0.0",
	"@politico/eslint-config-interactives": "^0.0.4",
	"aws-sdk": "^2.0.0",
	"babel-core": "7.0.0-bridge.0",
	"babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
	"babel-plugin-webpack-alias": "^2.1.2",
	"babel-preset-es2015": "^6.24.1",
	eslint: "^5.14.1",
	"eslint-plugin-mocha": "^5.3.0",
	"expect.js": "^0.3.1",
	"inquirer-test": "^2.0.1",
	mocha: "^5.2.0",
	nodemon: "^1.18.4",
	nyc: "^13.1.0",
	rollup: "^1.17.0",
	"rollup-plugin-alias": "^1.5.2",
	"rollup-plugin-babel": "^4.3.3",
	"rollup-plugin-json": "^4.0.0",
	"rollup-plugin-node-resolve": "^5.2.0",
	yarn: "^1.9.4"
};
var author = "";
var license = "MIT";
var peerDependencies = {
	"aws-sdk": "^2.0.0"
};
var dependencies = {
	"@babel/runtime": "^7.4.2",
	"@octokit/rest": "^17.1.2",
	"@politico/hermes": "^0.0.3",
	chalk: "^2.4.2",
	"child-process-promise": "^2.2.1",
	"cli-progress": "^2.1.1",
	ejs: "^2.6.1",
	figlet: "^1.2.1",
	"fs-extra": "^7.0.1",
	glob: "^7.1.4",
	"glob-gitignore": "^1.0.13",
	ignore: "^5.1.2",
	inquirer: "^6.2.2",
	istextorbinary: "^2.5.1",
	lodash: "^4.17.11",
	"npm-api": "^0.4.12",
	"require-from-string": "^2.0.2",
	rimraf: "^2.6.3",
	semver: "^6.2.0",
	yargs: "^13.3.0"
};
var repository = {
	type: "git",
	url: "git@github.com:The-Politico/politico-interactive-templates.git"
};
var nyc = {
	include: "src"
};
var meta = {
	name: name,
	version: version,
	description: description,
	main: main,
	module: module$1,
	bin: bin,
	scripts: scripts,
	devDependencies: devDependencies,
	author: author,
	license: license,
	peerDependencies: peerDependencies,
	dependencies: dependencies,
	repository: repository,
	nyc: nyc
};

var validateTemplateVersion = (function (_ref) {
  var version = _ref.version;
  return version ? semver.satisfies(meta.version, version) : false;
});

module.exports = validateTemplateVersion;
