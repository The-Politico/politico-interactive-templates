import inquirer from 'inquirer';
import keys from 'lodash/keys';
import mapTemplates from '../mapTemplates';

const qCategory = choices => {
  return inquirer.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a category:',
  }]).then(({ answer }) => answer);
};

const qTemplate = choices => {
  return inquirer.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a template:',
  }]).then(({ answer }) => answer);
};

export default async function(templates) {
  const map = mapTemplates(templates);
  const categories = keys(map).map(c => ({
    name: c,
    value: c,
  }));

  const category = await qCategory(categories);

  const templateChoices = keys(map[category]).map(t => ({
    name: t,
    value: t,
  }));

  return qTemplate(templateChoices);
};
