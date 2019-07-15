import fs from 'fs-extra';
import configFilePath from 'Constants/configFile';

export default () => {
  return new Promise((resolve, reject) => {
    fs.readJson(configFilePath)
      .then(d => {
        resolve(d);
      })
      .catch(e => {
        if (e.message.endsWith('Unexpected end of JSON input')) {
          resolve({});
        } else if (e.message.startsWith('ENOENT: no such file or directory')) {
          resolve({});
        } else {
          reject(e);
        }
      });
  });
};
