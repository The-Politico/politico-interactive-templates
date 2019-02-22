import inquirer from 'inquirer';

export default () => inquirer.prompt([{
  type: 'input',
  name: 'answer',
  message: `What should we call this template?`,
}]).then(({ answer }) => answer);
