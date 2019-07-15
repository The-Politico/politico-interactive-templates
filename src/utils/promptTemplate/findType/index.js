import find from 'lodash/find';
import all from './all.js';
import category from './category.js';
import search from './search.js';

export const list = [
  {
    name: 'Show me template categories',
    value: 'category',
    func: category,
  },
  {
    name: 'Let me search for something',
    value: 'search',
    func: search,
  },
  {
    name: 'Show me all my templates',
    value: 'all',
    func: all,
  },
];

export default (type, templates) => {
  return find(list, { value: type }, { func: () => null }).func(templates);
};
