"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (templates) {
  const map = (0, _mapTemplates2.default)(templates);
  const categories = (0, _keys2.default)(map).map(c => ({
    name: c,
    value: c
  }));
  const category = await qCategory(categories);
  const templateChoices = (0, _keys2.default)(map[category]).map(t => ({
    name: t,
    value: t
  }));
  return qTemplate(templateChoices);
};

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _mapTemplates = require("../mapTemplates");

var _mapTemplates2 = _interopRequireDefault(_mapTemplates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const qCategory = choices => {
  return _inquirer2.default.prompt([{
    type: 'list',
    name: 'answer',
    choices: choices,
    message: 'Choose a category:'
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

;