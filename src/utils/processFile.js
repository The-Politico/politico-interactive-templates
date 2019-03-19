import path from 'path';
import fs from 'fs-extra';
import merge from 'lodash/merge';
import renameFile from './renameFile';

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

  const renderedFilepath = renameFile(filepath, config);

  await fs.outputFile(path.join(config.directory, renderedFilepath), renderedFile, { flag: 'w' });
};

export default processFile;
