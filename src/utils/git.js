import '@politico/interactive-bin/dist/scripts/env';
import { Octokit } from '@octokit/rest';

const client = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default client;
