import path from 'path';
import fs from 'fs-extra';
import merge from 'lodash/merge';
import uniq from 'lodash/uniq';
import keys from 'lodash/keys';
import includes from 'lodash/includes';
import constantIgnores from 'Constants/ignores';
import getFileParts from 'Utils/getFileParts';
import replaceFilepath from 'Utils/replaceFilepath';

const processFile = async function(filepath, options) {
  const defaults = {
    renderer: () => '',
    directory: '',
    context: {},
    rename: {},
    ignore: {
      directories: {},
      files: {},
    },
  };

  const config = merge({}, defaults, options);

  // ignore directories
  if (fs.lstatSync(filepath).isDirectory()) {
    return;
  }

  const { directories, filename } = getFileParts(filepath);

  // ignore files inside ignored directories
  const ignoredDirectories = uniq([...constantIgnores.directories, ...config.ignore.directories]);
  const hasIgnoredDirectory = directories.some(d => includes(ignoredDirectories, d));
  if (hasIgnoredDirectory) { return; }

  // ignore files inside ignored directories
  const ignoredFiles = uniq([...constantIgnores.files, ...config.ignore.files]);
  const isIgnoredFile = includes(ignoredFiles, filename);
  if (isIgnoredFile) { return; }

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
