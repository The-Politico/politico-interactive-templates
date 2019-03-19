import inquirer from 'inquirer';

export default name => inquirer.prompt([{
  type: 'confirm',
  name: 'answer',
  message: `You already have a template named ${name} with a different GitHub path. Would you like to override it?`,
}]).then(({ answer }) => answer);
