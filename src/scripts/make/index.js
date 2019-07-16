import assign from 'lodash/assign';
import { exists, outputFile } from 'fs-extra';
import { Logger } from 'Utils/console';
import * as q from './questions';
import defaultConfig from './default';

/**
 * Creates a default .pitrc file in the current working directory
 * @param {string} [name] - The name of the template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when .pitrc is built
 */
export default async function(name, verbose = true) {
  // Set up logger
  const logger = new Logger({ verbose });
  const log = logger.log;

  log(`🧱 PIT: Making a new template configuration file.`);

  if (await exists('.pitrc')) {
    log(`.pitrc file already exists.`, 'error');
    process.exitCode = 1;
    return;
  }

  if (!name) {
    if (verbose) {
      name = await q.name();
    } else {
      log('Missing first argument: "name"', 'error');
      process.exitCode = 1;
      return;
    }
  }

  const config = assign({}, defaultConfig, { name });
  await outputFile('.pitrc', `module.exports = ${JSON.stringify(config, null, 2)}`);

  if (verbose) {
    log(`New .pitrc file created.`, 'success');
  }
};
