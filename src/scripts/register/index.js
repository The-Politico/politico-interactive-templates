import path from 'path';
import keys from 'lodash/keys';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import downloadRepo from 'Utils/downloadRepo';
import rimraf from 'Utils/rimraf';
import cwd from 'Utils/cwd';
import * as q from './questions';

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

  const alreadyRegistered = keys(globalConfig.templates).some(t => {
    if (globalConfig.templates[t].path === githubPath) {
      if (verbose) {
        console.log(`This template has already been registered as "${t}".`);
      }
    }
  });
  if (alreadyRegistered) { return; }

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
      const confirmOverride = await q.override();
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
