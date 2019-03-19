import spawn from 'Utils/spawn';
import path from 'path';

export default (templatePath, directory = '', verbose = true, tmpName = '.tmp.pit') => {
  return spawn('git', ['clone', templatePath, path.join(directory, tmpName)], verbose);
};
