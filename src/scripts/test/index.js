import path from 'path';
import chalk from 'chalk';
import glob from 'glob';
import { lstat, readFile } from 'fs-extra';
import setup from 'Scripts/new/setup';
import output from 'Scripts/new/output';
import { toFile } from 'Utils/processFile';
import cwd from 'Utils/cwd';
import rimraf from 'Utils/rimraf';

/**
 * Tests a tempalte directory
 * @param {Object} [context] - Data to pass for the test
 * @param {string} [templateDirectory=".tmp.pit"] - The directory containing template files
 * @param {string} [outputDirectory=""] - The directory in which to save the new template
 * @param {boolean} [cleanup=true] - Whether to delete the output files after the test completes
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
export default async function(baseContext, templateDirectory = '', outputDirectory = '.tmp.pit', cleanup = true, verbose = true) {
  const absoluteTemplateDir = path.join(cwd, templateDirectory);

  let templateConfig;
  try {
    templateConfig = require(path.join(absoluteTemplateDir, '.pitrc'));
  } catch (err) {
    console.error(chalk.yellow(`Looks like there's something wrong with your ".pitrc" file`));
    throw err;
  }

  let conf;
  try {
    conf = await setup('', outputDirectory, verbose, baseContext, templateConfig);
  } catch (e) {
    throw e;
  }
  const { renderer, context } = conf;

  const files = await processLocalRepo(absoluteTemplateDir, {
    destination: outputDirectory,
    templateConfig,
    renderer,
    context,
  });

  await output(files, verbose);

  if (cleanup) {
    await rimraf(outputDirectory);
  }

  if (verbose) {
    console.log('Test complete. Looks like your template is good to go!');
  }
};

async function processLocalRepo(dir, opts) {
  const files = glob.sync(path.join(dir, '**'), { dot: true });

  let filesData = await Promise.all(files.map(async function(f) {
    if ((await lstat(f)).isFile()) {
      const data = {
        content: await readFile(f),
        encoding: 'base64',
        name: path.basename(f),
        path: f.split(dir)[1],
      };
      return toFile(data, opts);
    } else {
      return null;
    }
  }));

  return filesData.filter(f => f);
}
