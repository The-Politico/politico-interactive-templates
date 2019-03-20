import inquirer from 'inquirer';
import keys from 'lodash/keys';

const q = templates => {
  const choices = keys(templates).map(k => ({
    name: k,
    value: k,
  }));

  return inquirer.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a template:',
  }]).then(({ answer }) => answer);
};

export default async function(templates) {
  return q(templates);
};
