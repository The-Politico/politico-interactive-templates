import parseRepoPath from 'Utils/parseRepoPath';
import getGlobalConfig from 'Utils/getGlobalConfig';
import getRepoConfig from 'Utils/getRepoConfig';
import outputGlobalConfig from 'Utils/outputGlobalConfig';
import { Logger } from 'Utils/console';
import * as q from './questions';

/**
 * Registers a template in the user's global .pitrc file
 * @param {string} [githubPath] - The path to a repo
 * @param {boolean} [verbose=true] - Whether to log outputs and prompt for inputs
 * @param {string} [tmpName] - The name of the directory to temporarily create in order to complete registration (mostly used for testing)
 * @return {Promise} Resolves when the template is registered
 */
const register = async function(githubPath, verbose = true, tmpName = '.tmp.pit') {
  // Set up logger
  const logger = new Logger({ verbose });
  const log = logger.log;
  log(`🧱 PIT: Registering a new template.`);

  // Check for required args
  if (!githubPath) {
    if (verbose) {
      githubPath = await q.path();
    } else {
      throw new Error('Missing first argument: "githubPath"');
    }
  }

  // Get/make the global config file
  let globalConfig = await getGlobalConfig();
  if (globalConfig === undefined) {
    globalConfig = {};
  }
  if (!('templates' in globalConfig)) {
    globalConfig.templates = {};
  }

  // Get the name/category from the repo's config
  const repoInfo = parseRepoPath(githubPath);
  const pitrc = await getRepoConfig(repoInfo);
  const name = pitrc.name ? pitrc.name : null;
  const category = pitrc.category ? pitrc.category : null;

  if (name in globalConfig.templates) {
    if (verbose) {
      const confirmOverride = await q.override(name);
      if (!confirmOverride) { return; }
    } else {
      return;
    }
  }

  globalConfig.templates[name] = {
    owner: repoInfo.owner,
    repo: repoInfo.repo,
    category,
  };
  await outputGlobalConfig(globalConfig);

  log(`Your template, ${name}, has been registered. Run "pit new" to generate a new project.`, 'success');
};

export default register;
