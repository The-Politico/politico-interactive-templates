import flattenDeep from 'lodash/flattenDeep';
import getRepoConfig from './getRepoConfig';

export default async function getRepoDependencies(repoPath, local = false) {
  let dependencies = [];
  const repoConfig = await getRepoConfig(repoPath, local);

  if (repoConfig.dependencies) {
    const additions = await Promise.all(repoConfig.dependencies.map(d => getRepoDependencies(d)));
    dependencies = [...repoConfig.dependencies, ...additions];
  }

  return flattenDeep(dependencies);
}
