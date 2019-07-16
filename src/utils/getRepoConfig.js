import path from 'path';
import requireFromString from 'require-from-string';
import parseRepoPath from './parseRepoPath';
import client from './git';
import { toString } from './processFile';
import { Logger } from './console';

export default async function(repoPath, local = false) {
  const logger = new Logger();

  if (local) {
    let pitrc;
    const pitrcPath = path.join(repoPath, '.pitrc');
    try {
      pitrc = require(pitrcPath);
    } catch (err) {
      logger.log(`File ${repoPath.bold(pitrcPath)} could not be loaded.`, 'error');
      throw err;
    }
    return pitrc;
  } else {
    let owner, repo;
    if (typeof repoPath === 'string') {
      ({ owner, repo } = parseRepoPath(repoPath));
    } else {
      ({ owner, repo } = repoPath);
    }

    const fileData = await client.repos.getContents({
      owner,
      repo,
      path: '.pitrc',
    });

    const pitrc = await toString(fileData.data);
    return requireFromString(pitrc);
  }
}
