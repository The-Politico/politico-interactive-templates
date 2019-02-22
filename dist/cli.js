#!/usr/bin/env node
"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _new = require("./new");

var _new2 = _interopRequireDefault(_new);

var _register = require("./register");

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_yargs2.default // eslint-disable-line
.help().scriptName('pit') // New
.command('new [template] [directory]', 'Creates a new project from a template.', yargs => {
  yargs.positional('template', {
    describe: 'The template to use',
    type: 'string'
  }).positional('directory', {
    describe: 'A directory to put the new project',
    type: 'string',
    default: ''
  }).option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    default: true
  });
}, async function (argv) {
  await (0, _new2.default)(argv.template, argv.directory, argv.verbose);
}) // Register
.command('register [name] [path]', 'Registers new templates for use.', yargs => {
  yargs.positional('name', {
    describe: 'The name of the template',
    type: 'string'
  }).positional('path', {
    describe: 'The GitHub path for the template',
    type: 'string'
  }).option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    default: true
  });
}, async function (argv) {
  await (0, _register2.default)(argv.name, argv.path, argv.verbose);
}).argv;