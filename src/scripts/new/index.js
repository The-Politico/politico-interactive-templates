import fs from 'fs-extra';
import path from 'path';
import keys from 'lodash/keys';
import merge from 'lodash/merge';
import inquirer from 'inquirer';
import { sync as globSync } from 'glob-gitignore';

import getConfig from 'Utils/getConfig';
import rimraf from 'Utils/rimraf';
import cwd from 'Utils/cwd';
import processFile from 'Utils/processFile';
import * as renderMethods from 'Utils/renderer';
import downloadRepo from 'Utils/downloadRepo';
import alwaysIgnore from 'Constants/ignores';

import * as q from './questions';

export const setup = async function(template, directory = '', verbose = true) {
  const globalConfig = await getConfig();

  await fs.ensureDir(directory);

  if (!template) {
    template = await q.template(globalConfig.templates);
  }

  if (globSync(path.join(directory, cwd, '**')).length > 1) {
    console.error('There are files in this directory. Please empty it to start a new project.');
    return;
  }

  const templatePath = globalConfig.templates[template].path;

  await downloadRepo(templatePath, directory, verbose);
};

export const build = async function(context, directory = '', verbose = true) {
  const projectConfig = require(path.join(cwd, directory, '.tmp.pit', '.pitrc'));

  const renderer = renderMethods[projectConfig.renderer];
  if (renderer === undefined) {
    throw new Error(`${projectConfig.renderer} is an invalid rendering method. Available methods are ${keys(renderMethods).join(', ')}`);
  }

  if (!context) {
    context = await inquirer.prompt(projectConfig.args);
  }

  context = merge({}, context, projectConfig.context);

  const templateFiles = globSync(path.join(directory, '.tmp.pit', '**'), {
    dot: true,
    ignore: projectConfig.ignore.concat(alwaysIgnore),
  });
  return Promise.all(templateFiles.map(filepath => processFile(filepath, {
    renderer,
    context,
    directory,
    rename: projectConfig.rename,
  })));
};

export const cleanup = async function(directory = '', verbose = true) {
  await rimraf(path.join(directory, '.tmp.pit'));
};

const newProject = async function(template, directory, verbose = true) {
  await setup(template, directory, verbose);
  await build(null, directory, verbose);
  await cleanup(directory, verbose);

  if (verbose) {
    console.log('Success! Your new project is ready.');
  }
};

export default newProject;
