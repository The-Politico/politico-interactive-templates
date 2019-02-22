import spawn from 'Utils/spawn';
import path from 'path';

export default (templatePath, directory = '', verbose = true) => {
  return spawn('git', ['clone', templatePath, path.join(directory, '.tmp.pit')], verbose);
};
