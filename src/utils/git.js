import '@politico/interactive-bin/lib/scripts/env';
import { Octokit } from '@octokit/rest';

const client = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default client;
