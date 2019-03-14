#!/usr/bin/env node
"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _scripts = require("./scripts");

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
  await (0, _scripts.newProject)(argv.template, argv.directory, argv.verbose);
}) // Register
.command('register [path]', 'Registers new templates for use.', yargs => {
  yargs.positional('path', {
    describe: 'The GitHub path for the template',
    type: 'string'
  }).option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    default: true
  });
}, async function (argv) {
  await (0, _scripts.register)(argv.path, argv.verbose);
}).argv;