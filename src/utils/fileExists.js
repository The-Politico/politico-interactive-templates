import path from 'path';
import { exists, lstatSync } from 'fs-extra';

export default async function(fp, dir) {
  const fullPath = path.join(dir, fp);

  if (await exists(fullPath) && !(lstatSync(fullPath).isDirectory())) {
    return true;
  } else {
    return false;
  }
}
