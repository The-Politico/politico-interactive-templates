import path from 'path';
import findIndex from 'lodash/findIndex';
import { ensureDir, writeFile, exists } from 'fs-extra';
import { Logger } from 'Utils/console';

export default async function(files, verbose) {
  // Set up logger
  const logger = new Logger({ verbose });

  const anyFilesExist = (
    await Promise.all(
      files.map(async function(f) {
        return {
          exists: await exists(f.path),
          path: f.path,
        };
      })
    )
  ).filter(f => f.exists);

  if (anyFilesExist.length > 0) {
    throw new Error(`"${anyFilesExist[0].path}" already exists. Aborting template creation. No files were created.`);
  }

  const uniqueFiles = [];
  files.forEach(f => {
    const fileIdx = findIndex(uniqueFiles, { path: f.path });
    if (fileIdx >= 0) {
      uniqueFiles.splice(fileIdx, 1);
    }

    uniqueFiles.push(f);
  });

  await Promise.all(uniqueFiles.map(async function(f) {
    await ensureDir(path.dirname(f.path));
    await writeFile(f.path, f.content);
    logger.log(f.path, 'info');
  }));
};
