import inquirer from 'inquirer';

export default () => inquirer.prompt([{
  type: 'input',
  name: 'answer',
  message: `What do you want to call this template?`,
}]).then(({ answer }) => answer);
