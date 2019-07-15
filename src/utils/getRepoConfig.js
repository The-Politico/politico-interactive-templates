import requireFromString from 'require-from-string';
import client from './git';
import { toString } from './processFile';

export default async function({ owner, repo }) {
  const fileData = await client.repos.getContents({
    owner,
    repo,
    path: '.pitrc',
  });

  const pitrc = await toString(fileData.data);
  return requireFromString(pitrc);
}
