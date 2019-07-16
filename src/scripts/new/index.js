import path from 'path';
import assign from 'lodash/assign';
import flattenDeep from 'lodash/flattenDeep';
import setup from './setup';
import build from './build';
import output from './output';
import chalk from 'chalk';
import cwd from 'Utils/cwd';
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
  log(`🧱 PIT: Creating a new template in ${chalk.bold(path.join(cwd, destination))}.`);

  log(`\n[1/3] ⏳  Loading template configuration...`);
  let conf;
  try {
    conf = await setup({ template, destination, verbose, context: defaultContext, override: setupOverride });
  } catch (e) {
    log(e.message, 'error');
    process.exitCode = 1;
    e.handled = true;
    throw e;
  }
  const { repos, config, renderer, context } = conf;

  log(`\n[2/3] ✏️  Rendering template...`);
  const files = flattenDeep(await Promise.all(repos.map(d =>
    build(assign({}, d, {
      destination,
      config,
      renderer,
      context,
    }))
  )));

  log(`\n[3/3] 💾  Saving files...`);
  try {
    await output(files, verbose);
  } catch (e) {
    log(e.message, 'error');
    process.exitCode = 1;
    e.handled = true;
    throw e;
  }

  log('');
  log(`New ${chalk.bold(config.name)} saved to ${chalk.bold(path.join(cwd, destination))}.`, 'success');
};
