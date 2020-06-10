import client from './git';
import { toFile } from './processFile';

const MAX_SIZE = 1000000;

async function downloadFile(opts, preData) {
  const {
    owner,
    repo,
    path: repoFilePath,
  } = opts;

  const {
    size,
    sha,
  } = preData;

  let fileData;
  if (size > MAX_SIZE) {
    fileData = await client.gitdata.getBlob({
      owner,
      repo,
      sha: sha,
    });
  } else {
    fileData = await client.repos.getContent({
      owner,
      repo,
      path: repoFilePath,
    });
  }

  if (fileData) {
    return toFile(fileData.data, opts);
  }
}

export default downloadFile;
