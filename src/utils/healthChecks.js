import meta from 'Root/package.json';
import semver from 'semver';
import chalk from 'chalk';
import getLastNonBetaVersion from 'Utils/getLatestNonBetaVersion';

export default async function() {
  const latest = await getLastNonBetaVersion('@politico/interactive-templates');

  let inGoodHealth = true;

  if (semver.lt(meta.version, latest)) {
    console.log(chalk.yellow(`\nIt looks like your version of PIT is out of date.\nYou should run "npm install -g @politico/interactive-templates" to update to version ${chalk.bold(latest)}.\n`));
    inGoodHealth = false;
  }

  return inGoodHealth;
}
