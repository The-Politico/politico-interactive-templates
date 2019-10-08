import getRepoConfig from './getRepoConfig';

async function getRepoDependencies(repoPath, local = false, depth = 0) {
  let dependencies = [];
  const repoConfig = await getRepoConfig(repoPath, local);

  if (repoConfig.dependencies) {
    for (var idx = 0; idx < repoConfig.dependencies.length; idx++) {
      const d = repoConfig.dependencies[idx];
      dependencies.push({ path: d, idx, depth });

      const additions = await getRepoDependencies(d, false, depth + 1);
      additions.forEach(a => {
        dependencies.push(a);
      });
    }
  }

  return dependencies;
}

export default async(repoPath, local = false) => {
  const dependencies = await getRepoDependencies(repoPath, local, 0);
  return dependencies
    .sort((a, b) => {
      if (a.depth === b.depth) {
        return a.idx - b.idx;
      } else {
        return b.depth - a.depth;
      }
    })
    .map(d => d.path);
};
