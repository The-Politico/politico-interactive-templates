import fs from 'fs-extra';
import configFilePath from 'Constants/configFile';

export default config => {
  return fs.outputJson(configFilePath, config)
    .catch(e => {
      console.error(e);
    });
};
