#!/usr/bin/env node
"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _scripts = require("./scripts");

var _figlet = require("figlet");

var _figlet2 = _interopRequireDefault(_figlet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('\nWelcome to Politico Interactive Templates (PIT)!');
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
  console.log('Looks like you want to register an existing template.');
  await (0, _scripts.register)(argv.path, argv.verbose);
}) // Make
.command('make [name]', 'Creates a template .pitrc file', yargs => {
  yargs.positional('name', {
    describe: 'The name of your template',
    type: 'string'
  }).option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    default: true
  });
}, async function (argv) {
  console.log('Looks like you want to make a new template.');
  await (0, _scripts.make)(argv.name, argv.verbose);
}).argv;