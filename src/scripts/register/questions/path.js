import inquirer from 'inquirer';

export default () => inquirer.prompt([{
  type: 'input',
  name: 'answer',
  message: `What's the GitHub path? (You can find this by clicking "Clone or download" in the repo page)`,
}]).then(({ answer }) => answer);
