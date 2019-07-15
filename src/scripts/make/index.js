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

  if (await exists('.pitrc')) {
    throw new Error('.pitrc file already exists.');
  }

  if (!name) {
    if (verbose) {
      name = await q.name();
    } else {
      throw new Error('Missing first argument: "name"');
    }
  }

  const config = assign({}, defaultConfig, { name });
  await outputFile('.pitrc', `module.exports = ${JSON.stringify(config, null, 2)}`);

  if (verbose) {
    log(`New .pitrc file created.`);
  }
};
