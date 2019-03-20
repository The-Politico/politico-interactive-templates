"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = async function (templates) {
  return q(templates);
};

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const q = templates => {
  const choices = (0, _keys2.default)(templates).map(k => ({
    name: k,
    value: k
  }));
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