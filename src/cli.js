#!/usr/bin/env node
import yargs from 'yargs';
import { readJSON } from 'fs-extra';
import { newProject, register, unregister, make, test } from './scripts';
import healthChecks from 'Utils/healthChecks';

console.log('\nWelcome to Politico Interactive Templates!');

yargs // eslint-disable-line
  .help()
  .scriptName('pit')

  // New
  .command('new [template] [directory]', 'Creates a new project from a template.', (yargs) => {
    yargs
      .positional('template', {
        alias: 't',
        describe: 'The template to use',
        type: 'string',
      })
      .positional('directory', {
        alias: 'd',
        describe: 'A directory to put the new project',
        type: 'string',
        default: '',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function({ template, directory, verbose }) {
    if (verbose) {
      await healthChecks();
    }

    await newProject(template, directory, verbose);
  })

  // Register
  .command('register [path]', 'Registers new templates for use.', (yargs) => {
    yargs
      .positional('path', {
        describe: 'The GitHub path for the template',
        type: 'string',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function({ path, verbose }) {
    if (verbose) {
      await healthChecks();
      console.log('Looks like you want to register an existing template.');
    }

    await register(path, verbose);
  })

  // Unregister
  .command('unregister [template]', 'Creates a new project from a template.', (yargs) => {
    yargs
      .positional('template', {
        alias: 't',
        describe: 'The template to remove',
        type: 'string',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function({ template, verbose }) {
    if (verbose) {
      await healthChecks();
      console.log('Looks like you want to unregister a template.');
    }

    await unregister(template, verbose);
  })

  // Make
  .command('make [name]', 'Creates a template .pitrc file', (yargs) => {
    yargs
      .positional('name', {
        describe: 'The name of your template',
        type: 'string',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function({ name, verbose }) {
    if (verbose) {
      await healthChecks();
      console.log('Looks like you want to make a new template.');
    }

    await make(name, verbose);
  })

  // Test
  .command('test [context] [templateDirectory] [outputDirectory]', 'Tests a template', (yargs) => {
    yargs
      .positional('context', {
        describe: 'The path to a JSON file with context for your test',
        type: 'string',
      })
      .positional('templateDirectory', {
        alias: 't',
        describe: 'The directory containing template files',
        type: 'string',
      })
      .positional('outputDirectory', {
        alias: 'o',
        describe: 'The directory to save the template test files',
        type: 'string',
      })
      .option('cleanup', {
        alias: 'c',
        describe: 'Delete template files after test is complete',
        type: 'boolean',
        default: true,
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function({ context: contextPath, templateDirectory, outputDirectory, cleanup, verbose }) {
    if (verbose) {
      await healthChecks();
      console.log('Looks like you want to test your new template.');
    }

    let context;
    if (contextPath) {
      context = await readJSON(contextPath);
    }

    await test(context, templateDirectory, outputDirectory, cleanup, verbose);
  })

  // Info
  .command('info', 'Runs health checks.', yargs => yargs, async function(argv) {
    const health = await healthChecks();
    if (health) {
      console.log('\n...Everything is up to date.');
    }
  })

  .argv;
