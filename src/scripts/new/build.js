import assign from 'lodash/assign';
import flattenDeep from 'lodash/flattenDeep';
import client from 'Utils/git';
import downloadFile from 'Utils/downloadFile';

async function processRepo(opts) {
  if (!opts) {
    return [];
  }

  const {
    owner,
    repo,
  } = opts;

  if (!owner || !repo) {
    return [];
  }

  const repoPath = opts.path || '';

  const files = await client.repos.getContents({
    owner,
    repo,
    path: repoPath,
  });

  // get a list of would-be outputs for this template
  let output = await Promise.all(files.data.map(data => {
    const { type, path: filePath } = data;
    const recursedOpts = assign({}, opts, { path: filePath });
    if (type === 'file') {
      return downloadFile(recursedOpts, data);
    } else {
      return processRepo(recursedOpts);
    }
  }));

  // filter out nulls caused by ignored files
  output = flattenDeep(output).filter(x => x != null);

  return output;
}

export default processRepo;
