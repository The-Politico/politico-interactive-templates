import inquirer from 'inquirer';

export default name => inquirer.prompt([{
  type: 'confirm',
  name: 'answer',
  message: `You already have a template named "${name}". Would you like to override it?`,
}]).then(({ answer }) => answer);
