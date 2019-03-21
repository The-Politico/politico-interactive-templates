import path from 'path';
import rimraf from 'Utils/rimraf';

/**
 * Deletes the template directory created in setup
 * @param {string} [directory=""] - The directory that holds the .tmp.pit directory
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are deleted
 */
const cleanup = async function(directory = '', verbose = true) {
  await rimraf(path.join(directory, '.tmp.pit'));
};

export default cleanup;
