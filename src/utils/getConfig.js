import fs from 'fs-extra';
import configFilePath from 'Constants/configFile';

export default () => {
  return fs.readJson(configFilePath)
    .catch(e => {
      console.error(e);
    });
};
