import path from 'path';
import { build } from '../new';
import rimraf from 'Utils/rimraf';

const test = async function(templateDirectory = '', outputDirectory = '.tmp.pit', cleanup = true) {
  try {
    require(path.join(templateDirectory, '.pitrc'));
  } catch (err) {
    console.error(`Looks like there's something wrong with your ".pitrc" file`);
    throw err;
  }

  build(null, templateDirectory, outputDirectory);

  if (cleanup) {
    rimraf(outputDirectory);
  }
};

export default test;
