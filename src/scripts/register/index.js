import path from 'path';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import downloadRepo from 'Utils/downloadRepo';
import rimraf from 'Utils/rimraf';
import cwd from 'Utils/cwd';
import * as q from './questions';

/**
 * Registers a template in the user's global .pitrc file
 * @param {string} [githubPath] - The path to a repo
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @param {string} [tmpName] - The name of the directory to temporarily create in order to complete registration (mostly used for testing)
 * @return {Promise} Resolves when the template is registered
 */
const register = async function(githubPath, verbose = true, tmpName = '.tmp.pit') {
  if (!githubPath) {
    if (verbose) {
      githubPath = await q.path();
    } else {
      throw new Error('Missing first argument: "githubPath"');
    }
  }

  let globalConfig = await getConfig();

  if (globalConfig === undefined) {
    globalConfig = {};
  }

  if (!('templates' in globalConfig)) {
    globalConfig.templates = {};
  }

  let name = null;
  let category = null;
  try {
    await rimraf(tmpName);
    await downloadRepo(githubPath, undefined, verbose, tmpName);
    const pitrc = require(path.join(cwd, tmpName, '.pitrc'));
    name = pitrc.name ? pitrc.name : null;
    category = pitrc.category ? pitrc.category : null;
  } catch (err) {
    await rimraf(tmpName);

    if (verbose) {
      console.error('There was a problem reading your .pitrc file. Make sure it\'s written in valid node syntax.');
    }

    throw err;
  }

  await rimraf(tmpName);

  if (name in globalConfig.templates) {
    if (verbose) {
      const confirmOverride = await q.override(name);
      if (!confirmOverride) { return; }
    } else {
      return;
    }
  }

  globalConfig.templates[name] = {
    path: githubPath,
    category,
  };
  await outputConfig(globalConfig);

  if (verbose) {
    console.log(`Success! Your template, ${name}, has been registered. Run "pit new" to generate a new project.`);
  }
};

export default register;
