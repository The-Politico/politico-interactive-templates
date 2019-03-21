import keys from 'lodash/keys';
import replaceFilepath from 'Utils/replaceFilepath';

export default (filepath, config) => {
  let unrenderedFilepath = filepath.split('.tmp.pit/')[1];

  if (!unrenderedFilepath) {
    unrenderedFilepath = filepath;
  }

  let renderedFilepath = unrenderedFilepath;
  keys(config.rename).forEach(replace => {
    const replaceWith = config.rename[replace];
    renderedFilepath = replaceFilepath(renderedFilepath, replace, replaceWith, config.context);
  });

  return renderedFilepath;
};
