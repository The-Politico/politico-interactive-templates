import meta from 'Root/package.json';
import semver from 'semver';
import npm from 'npm-api';
import chalk from 'chalk';

export default async function() {
  const packagejson = await npm().repo('@politico/interactive-templates').package();

  let inGoodHealth = true;

  if (semver.lt(meta.version, packagejson.version)) {
    console.log(chalk.yellow(`\nIt looks like your version of PIT is out of date.\nYou should run "npm install -g @politico/interactive-templates" to update to version ${chalk.bold(packagejson.version)}.\n`));
    inGoodHealth = false;
  }

  return inGoodHealth;
}
