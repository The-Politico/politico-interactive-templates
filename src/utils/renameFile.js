import keys from 'lodash/keys';
import replaceFilepath from 'Utils/replaceFilepath';

export default (filepath, config) => {
  const unrenderedFilepath = filepath.split('.tmp.pit/')[1];

  if (!unrenderedFilepath) { return null; }

  let renderedFilepath = unrenderedFilepath;
  keys(config.rename).forEach(replace => {
    const replaceWith = config.rename[replace];
    renderedFilepath = replaceFilepath(renderedFilepath, replace, replaceWith, config.context);
  });

  return renderedFilepath;
};
