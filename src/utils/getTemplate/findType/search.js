import inquirer from 'inquirer';
import keys from 'lodash/keys';

const qSearch = () => {
  return inquirer.prompt([{
    type: 'input',
    name: 'answer',
    message: 'What are you looking for?',
  }]).then(({ answer }) => answer);
};

const qEmpty = choices => {
  return inquirer.prompt([{
    type: 'confirm',
    name: 'answer',
    default: true,
    message: 'Looks like you don\'t have any registered templates that match this search. Try something else?',
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

const search = async function(templates) {
  const phrase = await qSearch();
  const rgx = new RegExp(phrase, 'i');
  const choices = keys(templates).filter(t => t.match(rgx)).map(t => ({
    name: t,
    value: t,
  }));

  if (choices.length > 0) {
    return qTemplate(choices);
  } else {
    if (await qEmpty()) {
      return search(templates);
    } else {
      return null;
    }
  }
};

export default search;
