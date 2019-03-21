import path from 'path';
import { build } from '../new';
import cwd from 'Utils/cwd';
import rimraf from 'Utils/rimraf';
import chalk from 'chalk';

/**
 * Tests a tempalte directory
 * @param {Object} [context] - Data to pass for the test
 * @param {string} [templateDirectory=".tmp.pit"] - The directory containing template files
 * @param {string} [outputDirectory=""] - The directory in which to save the new template
 * @param {boolean} [cleanup=true] - Whether to delete the output files after the test completes
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
const test = async function(context, templateDirectory = '', outputDirectory = '.tmp.pit', cleanup = true, verbose = true) {
  try {
    require(path.join(cwd, templateDirectory, '.pitrc'));
  } catch (err) {
    console.error(chalk.yellow(`Looks like there's something wrong with your ".pitrc" file`));
    throw err;
  }

  await build(context, templateDirectory, outputDirectory, verbose);

  if (cleanup) {
    await rimraf(outputDirectory);
  }

  if (verbose) {
    console.log('Test complete. Looks like your template is good to go!');
  }
};

export default test;
