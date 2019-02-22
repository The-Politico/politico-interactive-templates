import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import keys from 'lodash/keys';
import merge from 'lodash/merge';
import inquirer from 'inquirer';

import getConfig from 'Utils/getConfig';
import rimraf from 'Utils/rimraf';
import cwd from 'Utils/cwd';
import processFile from 'Utils/processFile';
import * as renderMethods from 'Utils/renderer';
import downloadRepo from 'Utils/downloadRepo';

import * as q from './questions';

export const setup = async function(template, directory = '', verbose = true) {
  const globalConfig = await getConfig();

  await fs.ensureDir(directory);

  if (!template) {
    template = await q.template(globalConfig.templates);
  }

  if (glob.sync(path.join(directory, cwd, '**')).length > 1) {
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

  const templateFiles = glob.sync(path.join(directory, '.tmp.pit', '**'), { dot: true });
  return Promise.all(templateFiles.map(filepath => processFile(filepath, {
    renderer,
    context,
    directory,
    ignore: projectConfig.ignore,
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
};

export default newProject;
