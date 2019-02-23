import path from 'path';
import fs from 'fs-extra';
import merge from 'lodash/merge';
import keys from 'lodash/keys';
import replaceFilepath from 'Utils/replaceFilepath';

const processFile = async function(filepath, options) {
  const defaults = {
    renderer: () => '',
    directory: '',
    context: {},
    rename: {},
  };

  const config = merge({}, defaults, options);

  // ignore directories
  if (fs.lstatSync(filepath).isDirectory()) {
    return;
  }

  const fileText = await fs.readFile(filepath, 'utf8');

  const renderedFile = config.renderer(fileText, config.context);

  const unrenderedFilepath = filepath.split('.tmp.pit/')[1];

  let renderedFilepath = unrenderedFilepath;
  keys(config.rename).forEach(replace => {
    const replaceWith = config.rename[replace];
    renderedFilepath = replaceFilepath(renderedFilepath, replace, replaceWith, config.context);
  });

  await fs.outputFile(path.join(config.directory, renderedFilepath), renderedFile, { flag: 'w' });
};

export default processFile;
