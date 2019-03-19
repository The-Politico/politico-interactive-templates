import inquirer from 'inquirer';

export default () => inquirer.prompt([{
  type: 'input',
  name: 'answer',
  message: `What should this template be named? `,
}]).then(({ answer }) => answer);
