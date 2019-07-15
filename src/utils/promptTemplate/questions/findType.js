import inquirer from 'inquirer';

import { list as choices } from '../findType';

export default () => inquirer.prompt([{
  type: 'list',
  choices: choices,
  name: 'answer',
  message: `How would you like to find your template?`,
}]).then(({ answer }) => answer);
