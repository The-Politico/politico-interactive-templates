"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const qSearch = () => {
  return _inquirer2.default.prompt([{
    type: 'input',
    name: 'answer',
    message: 'What are you looking for?'
  }]).then(({
    answer
  }) => answer);
};

const qEmpty = choices => {
  return _inquirer2.default.prompt([{
    type: 'confirm',
    name: 'answer',
    default: true,
    message: 'Looks like you don\'t have any registered templates that match this search. Try something else?'
  }]).then(({
    answer
  }) => answer);
};

const qTemplate = choices => {
  return _inquirer2.default.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a template:'
  }]).then(({
    answer
  }) => answer);
};

const search = async function (templates) {
  const phrase = await qSearch();
  const rgx = new RegExp(phrase, 'i');
  const choices = (0, _keys2.default)(templates).filter(t => t.match(rgx)).map(t => ({
    name: t,
    value: t
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

exports.default = search;