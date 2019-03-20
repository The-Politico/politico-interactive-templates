#!/usr/bin/env node
"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _scripts = require("./scripts");

var _healthChecks = require("./utils/healthChecks");

var _healthChecks2 = _interopRequireDefault(_healthChecks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('\nWelcome to Politico Interactive Templates!');
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
}, async function ({
  template,
  directory,
  verbose
}) {
  if (verbose) {
    await (0, _healthChecks2.default)();
  }

  await (0, _scripts.newProject)(template, directory, verbose);
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
}, async function ({
  path,
  verbose
}) {
  if (verbose) {
    await (0, _healthChecks2.default)();
    console.log('Looks like you want to register an existing template.');
  }

  await (0, _scripts.register)(path, verbose);
}) // Unregister
.command('unregister [template]', 'Creates a new project from a template.', yargs => {
  yargs.positional('template', {
    alias: 't',
    describe: 'The template to remove',
    type: 'string'
  }).option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    default: true
  });
}, async function ({
  template,
  verbose
}) {
  if (verbose) {
    await (0, _healthChecks2.default)();
    console.log('Looks like you want to unregister a template.');
  }

  await (0, _scripts.unregister)(template, verbose);
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
}, async function ({
  name,
  verbose
}) {
  if (verbose) {
    await (0, _healthChecks2.default)();
    console.log('Looks like you want to make a new template.');
  }

  await (0, _scripts.make)(name, verbose);
}) // Info
.command('info', 'Runs health checks.', yargs => yargs, async function (argv) {
  const health = await (0, _healthChecks2.default)();

  if (health) {
    console.log('\n...Everything is up to date.');
  }
}).argv;