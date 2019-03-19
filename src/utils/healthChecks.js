import meta from 'Meta';
import npm from 'npm-api';
import chalk from 'chalk';

export default async function() {
  const packagejson = await npm().repo('@politico/interactive-templates').package();

  if (meta.version !== packagejson.version) {
    console.log(chalk.yellow('\nIt looks like your version of PIT is out of date.\nYou should run "npm install -g @politico/interactive-templates" to update.\n'));
  }

  return true;
}
