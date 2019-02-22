#!/usr/bin/env node
import yargs from 'yargs';
import * as scripts from './scripts';

yargs // eslint-disable-line
  .help()
  .scriptName('pit')

  // New
  .command('new [template] [directory]', 'Creates a new project from a template.', (yargs) => {
    yargs
      .positional('template', {
        describe: 'The template to use',
        type: 'string',
      })
      .positional('directory', {
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
    await scripts.newProject(argv.template, argv.directory, argv.verbose);
  })

  // Register
  .command('register [name] [path]', 'Registers new templates for use.', (yargs) => {
    yargs
      .positional('name', {
        describe: 'The name of the template',
        type: 'string',
      })
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
    await scripts.register(argv.name, argv.path, argv.verbose);
  })
  .argv;
