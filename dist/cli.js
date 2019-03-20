#!/usr/bin/env node
"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _scripts = require("./scripts");

var _healthChecks = require("./utils/healthChecks");

var _healthChecks2 = _interopRequireDefault(_healthChecks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('\nWelcome to Politico Interactive Templates (PIT)!');
_yargs2.default // eslint-disable-line
.help().scriptName('pit') // New
.command('new [template] [directory]', 'Creates a new project from a template.', yargs => {
  yargs.positional('template', {
    alias: 't',
    describe: 'The template to use',
    type: 'string'
  }).positional('directory', {
    alias: 'd',
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
  await (0, _healthChecks2.default)();
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
  await (0, _healthChecks2.default)();
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
  await (0, _healthChecks2.default)();
  console.log('Looks like you want to make a new template.');
  await (0, _scripts.make)(argv.name, argv.verbose);
}) // Info
.command('info', 'Runs health checks.', yargs => yargs, async function (argv) {
  const health = await (0, _healthChecks2.default)();

  if (health) {
    console.log('Everything is up to date.');
  }
}).argv;