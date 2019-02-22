import ejs from 'ejs';

export default (str, context, options) => {
  return ejs.render(str, context, options);
};
