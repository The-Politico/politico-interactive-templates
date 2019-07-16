"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _fsExtra = require("fs-extra");

var _scripts = require("./scripts");

var _healthChecks = require("./utils/healthChecks");

var _healthChecks2 = _interopRequireDefault(_healthChecks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_yargs2.default // eslint-disable-line
.help().scriptName('pit') // New
.command('new [template] [destination]', 'Creates a new project from a template.', yargs => {
  yargs.positional('template', {
    alias: 't',
    describe: 'The template to use',
    type: 'string'
  }).positional('destination', {
    alias: 'd',
    describe: 'A destination to put the new project',
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
  destination,
  verbose
}) {
  if (verbose) {
    await (0, _healthChecks2.default)();
  }

  try {
    await (0, _scripts.newProject)(template, destination, verbose);
  } catch (e) {
    if (!e.handled) {
      throw e;
    }
  }
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
  }

  await (0, _scripts.make)(name, verbose);
}) // Test
.command('test [context] [templateDirectory] [outputDirectory]', 'Tests a template', yargs => {
  yargs.positional('context', {
    describe: 'The path to a JSON file with context for your test',
    type: 'string'
  }).positional('templateDirectory', {
    alias: 't',
    describe: 'The destination containing template files',
    type: 'string'
  }).positional('outputDirectory', {
    alias: 'o',
    describe: 'The destination to save the template test files',
    type: 'string'
  }).option('cleanup', {
    alias: 'c',
    describe: 'Delete template files after test is complete',
    type: 'boolean',
    default: true
  }).option('verbose', {
    alias: 'v',
    describe: 'Log to the console',
    type: 'boolean',
    default: true
  });
}, async function ({
  context: contextPath,
  templateDirectory,
  outputDirectory,
  cleanup,
  verbose
}) {
  if (verbose) {
    await (0, _healthChecks2.default)();
  }

  let context;

  if (contextPath) {
    context = await (0, _fsExtra.readJSON)(contextPath);
  }

  await (0, _scripts.test)(context, templateDirectory, outputDirectory, cleanup, verbose);
}) // Info
.command('info', 'Runs health checks.', yargs => yargs, async function (argv) {
  const health = await (0, _healthChecks2.default)();

  if (health) {
    console.log('\n...Everything is up to date.');
  }
}).argv;