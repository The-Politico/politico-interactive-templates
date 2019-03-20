#!/usr/bin/env node
import yargs from 'yargs';
import { newProject, register, make } from './scripts';
import healthChecks from 'Utils/healthChecks';

console.log('\nWelcome to Politico Interactive Templates (PIT)!');

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
  }, async function(argv) {
    await healthChecks();
    await newProject(argv.template, argv.directory, argv.verbose);
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
  }, async function(argv) {
    await healthChecks();
    console.log('Looks like you want to register an existing template.');
    await register(argv.path, argv.verbose);
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
  }, async function(argv) {
    await healthChecks();
    console.log('Looks like you want to make a new template.');
    await make(argv.name, argv.verbose);
  })

  // Info
  .command('info', 'Runs health checks.', yargs => yargs, async function(argv) {
    const health = await healthChecks();
    if (health) {
      console.log('Everything is up to date.');
    }
  })

  .argv;
