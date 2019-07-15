import * as q from './questions';
import findType from './findType';

export default async function(templates) {
  const type = await q.findType();
  return findType(type, templates);
}
