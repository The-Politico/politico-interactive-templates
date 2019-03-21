import path from 'path';
import keys from 'lodash/keys';
import merge from 'lodash/merge';
import inquirer from 'inquirer';
import { sync as globSync } from 'glob-gitignore';

import cwd from 'Utils/cwd';
import processFile from 'Utils/processFile';
import * as renderMethods from 'Utils/renderer';
import renameFile from 'Utils/renameFile';
import fileExists from 'Utils/fileExists';

import alwaysIgnore from 'Constants/ignores';

/**
 * Builds files from a template directory into an output directory
 * @param {Object} [context] - Data to pass to the template renderer
 * @param {string} [templateDirectory=".tmp.pit"] - The directory containing template files
 * @param {string} [outputDirectory=""] - The directory in which to save the new template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
const build = async function(context, templateDirectory, outputDirectory = '', verbose = true) {
  if (!templateDirectory && templateDirectory !== '') {
    templateDirectory = '.tmp.pit';
  }

  const projectConfig = require(path.join(cwd, templateDirectory, '.pitrc'));

  const renderer = renderMethods[projectConfig.renderer];
  if (renderer === undefined) {
    throw new Error(`${projectConfig.renderer} is an invalid rendering method. Available methods are ${keys(renderMethods).join(', ')}`);
  }

  if (!context) {
    context = await inquirer.prompt(projectConfig.prompts);
  }

  context = merge({}, context, projectConfig.statics);

  const templateGlob = path.join(templateDirectory, '**');
  const ignoredFiles = projectConfig.ignore ? projectConfig.ignore : [];
  const justCopyFiles = projectConfig.justCopy ? projectConfig.justCopy : [];

  const templateFiles = globSync(templateGlob, {
    dot: true,
    nodir: true,
    ignore: [...alwaysIgnore, ...ignoredFiles],
  });

  const renderAndCopyFiles = globSync(templateGlob, {
    dot: true,
    nodir: true,
    ignore: [...alwaysIgnore, ...ignoredFiles, ...justCopyFiles],
  });

  const processConfig = {
    renderer,
    context,
    directory: outputDirectory,
    rename: projectConfig.rename,
  };

  // Error if conflicts exist
  let conflictingFile = null;
  await Promise.all(
    templateFiles
      .map(
        filepath => renameFile(filepath, processConfig)
      ).filter(
        f => f !== null
      ).map(
        async function(fp) {
          if (await fileExists(fp, outputDirectory)) {
            conflictingFile = fp;
            return true;
          }
          return false;
        }
      )
  );

  if (conflictingFile) {
    throw new Error(`"${conflictingFile}" already exists. Aborting template creation. No files were created.`);
  }

  return Promise.all(templateFiles.map(filepath => processFile(filepath, processConfig, renderAndCopyFiles.includes(filepath))));
};

export default build;
