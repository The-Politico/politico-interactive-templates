import path from 'path';
import setup from './setup';
import build from './build';
import cleanup from './cleanup';

/**
 * Creates a new project.
 * @param {string} [template] - The name of the template
 * @param {string} [directory=""] - The directory in which to build the template
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @return {Promise} Resolves when files are built
 */
const newProject = async function(template, directory, verbose = true) {
  const setupSuccessful = await setup(template, directory, verbose);

  if (!setupSuccessful) {
    return;
  }

  await build(null, path.join(directory, '.tmp.pit'), directory, verbose);
  await cleanup(directory, verbose);

  if (verbose) {
    console.log('Success! Your new project is ready.');
  }
};

export default newProject;

export { setup, build, cleanup };
