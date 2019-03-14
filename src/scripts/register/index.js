import path from 'path';
import keys from 'lodash/keys';
import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import downloadRepo from 'Utils/downloadRepo';
import rimraf from 'Utils/rimraf';
import cwd from 'Utils/cwd';
import * as q from './questions';

const register = async function(githubPath, verbose = true) {
  if (!githubPath) {
    githubPath = await q.path();
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
      console.log(`This template name has already been registered as "${t}".`);
      return true;
    }
  });
  if (alreadyRegistered) { return; }

  let name = null;
  try {
    await downloadRepo(githubPath, undefined, verbose);
    const pitrc = require(path.join(cwd, '.tmp.pit', '.pitrc'));
    name = pitrc.name;
  } catch (err) {
    await rimraf('.tmp.pit');
    throw new Error(err);
  }

  await rimraf('.tmp.pit');

  globalConfig.templates[name] = { path: githubPath };
  await outputConfig(globalConfig);

  if (verbose) {
    console.log(`Success! Your template, ${name}, has been registered. Run "pit new" to generate a new project.`);
  }
};

export default register;
