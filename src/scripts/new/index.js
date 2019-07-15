import assign from 'lodash/assign';
import setup from './setup';
import build from './build';
import output from './output';
import chalk from 'chalk';
import { Logger } from 'Utils/console';

/**
 * Creates a new project.
 * @param {string} [template] - The name of the template
 * @param {string} [destination=""] - The directory in which to build the template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
export default async function(template, destination, verbose = true, defaultContext, setupOverride) {
  // Set up logger
  const logger = new Logger({ verbose });
  const log = logger.log;
  log(`🧱  Creating a new template in ${chalk.bold(destination)}.`);

  log(`\n[1/3] ⏳  Loading template configurion...`);
  let conf;
  try {
    conf = await setup(template, destination, verbose, defaultContext, setupOverride);
  } catch (e) {
    throw e;
  }
  const { templateOptions, templateConfig, renderer, context } = conf;

  log(`\n[2/3] ✏️  Rendering template...`);
  const files = await build(assign({}, templateOptions, {
    destination,
    templateConfig,
    renderer,
    context,
  }));

  log(`\n[3/3] 💾  Saving files...`);
  await output(files, verbose);

  log('');
  log(`New ${chalk.bold(template)} saved to ${chalk.bold(destination)}.`, 'success');
};
