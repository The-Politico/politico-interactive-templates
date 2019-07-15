import keys from 'lodash/keys';
import replaceFilepath from 'Utils/replaceFilepath';

export default (filepath, config) => {
  let renderedFilepath = filepath;
  keys(config.rename).forEach(replace => {
    const replaceWith = config.rename[replace];
    renderedFilepath = replaceFilepath(renderedFilepath, replace, replaceWith, config.context);
  });

  return renderedFilepath;
};
