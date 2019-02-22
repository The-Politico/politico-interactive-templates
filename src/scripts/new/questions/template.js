import inquirer from 'inquirer';
import keys from 'lodash/keys';

export default templates => {
  const choices = keys(templates).map(k => ({
    name: k,
    value: k,
  }));

  return inquirer.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: `What are you building today?`,
  }]).then(({ answer }) => answer);
};
