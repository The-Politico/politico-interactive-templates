import path from 'path';
import fs from 'fs-extra';
import merge from 'lodash/merge';
import { isBinary } from 'istextorbinary';
import renameFile from './renameFile';

const processFile = async function(filepath, options, shouldRender = true) {
  const defaults = {
    renderer: () => '',
    directory: '',
    context: {},
    rename: {},
  };

  const config = merge({}, defaults, options);

  const renderedFilepath = path.join(config.directory, renameFile(filepath, config));

  if (shouldRender && !isBinary(filepath)) {
    const fileText = await fs.readFile(filepath, 'utf8');
    let renderedFile = '';
    try {
      renderedFile = config.renderer(fileText, config.context);
    } catch (err) {
      console.error(`There was a problem rendering ${filepath}.`);
      throw err;
    }
    await fs.outputFile(renderedFilepath, renderedFile, { flag: 'w' });
  } else {
    await fs.copy(filepath, renderedFilepath);
  }
};

export default processFile;
