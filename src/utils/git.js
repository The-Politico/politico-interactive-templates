import { env } from '@politico/hermes';
import { Octokit } from '@octokit/rest';

env.loadEnvFromPibrc();

const client = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default client;
