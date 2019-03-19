import assign from 'lodash/assign';
import { exists, outputFile } from 'fs-extra';
import * as q from './questions';
import defaultConfig from './default';

const register = async function(name, verbose = true) {
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
    console.log(`New .pitrc file created.`);
  }
};

export default register;
