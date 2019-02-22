import getConfig from 'Utils/getConfig';
import outputConfig from 'Utils/outputConfig';
import * as q from './questions';

const register = async function(name, path, verbose = true) {
  if (!name) {
    name = await q.name();
  }

  if (!path) {
    path = await q.path();
  }

  const globalConfig = await getConfig();

  if (name in globalConfig.templates) {
    throw new Error('This template name has already been registered.');
  }

  globalConfig.templates[name] = { path };
  outputConfig(globalConfig);
};

export default register;
