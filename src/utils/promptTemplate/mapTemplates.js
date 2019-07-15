import keys from 'lodash/keys';

export default allTemplates => {
  const output = {};
  const other = {};

  keys(allTemplates).forEach(key => {
    const template = allTemplates[key];
    const { category } = template;

    if (category && category !== 'All' && category !== 'Other') {
      if (!(category in output)) {
        output[category] = {};
      }

      output[category][key] = template;
    } else {
      other[key] = template;
    }
  });

  output.Other = other;

  return output;
};
